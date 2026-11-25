// 이 브랜치의 변경이 어느 기능(F-ID)에 닿는지 계산해 JSON 으로 출력합니다. write-pr 스킬이 판정 근거로 씁니다.
// 사용: node apps/web/scripts/feature-impact.mjs [기준 브랜치=develop]
//
// 표식: JSX 요소의 data-feature 속성 (src/featureAttribute.d.ts). 그 요소의 시작~끝 줄이 기능의 범위입니다.
//
// 귀속 규칙
// - 변경 줄이 data-feature 범위 안이면 가장 안쪽 범위의 기능에 귀속합니다.
// - 컴포넌트 안에 표식이 있으면, 그 컴포넌트를 렌더하는 요소(예: 페이지의 <ProductRankingSection />)도
//   같은 기능의 범위로 봅니다. 표식을 컴포넌트 안으로 옮겨도 페이지 쪽 조립 변경을 놓치지 않기 위해서입니다.
// - 범위 밖이면 그 파일을 "쓰는 곳"(import 위치가 아니라 실제 사용 위치)을 거슬러 올라가 닿는 기능을 모읍니다.
//   그 줄을 감싸는 함수 중 표식을 품은 가장 가까운 함수의 기능들도 함께 영향을 받는 것으로 봅니다
//   (예: 페이지 컴포넌트 최상단의 훅 호출). routes 처럼 함수 밖에 나열된 줄은 퍼지지 않습니다.
// - 닿는 기능이 정확히 하나면 changed, 여럿이면 possible 입니다. possible 은 완료로 기록하지 않고 사람에게 묻습니다.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const base = process.argv[2] ?? 'develop';
const git = (...args) =>
  execFileSync('git', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });

const repoRoot = git('rev-parse', '--show-toplevel').trim();
const webRoot = path.join(repoRoot, 'apps/web');
const SCOPES = ['apps/web/src', 'packages/shared/src'];
// 표식 자체와 그 타입은 기능 코드가 아니므로 사용처 계산에서 뺍니다. 넣으면 모든 기능이 possible 이 됩니다.
const MARKER_FILES = new Set(
  [
    'apps/web/src/featureAttribute.d.ts',
    'packages/shared/src/features/generated/features.ts',
  ].map((file) => path.join(repoRoot, file))
);

const features = new Map(
  JSON.parse(
    readFileSync(
      path.join(repoRoot, 'packages/shared/features/features.json'),
      'utf8'
    )
  ).map((feature) => [feature.id, feature])
);

// ── 1. 변경 줄 수집 ─────────────────────────────────────────────

const isCommentLine = (line) => {
  const text = line.trim();
  return (
    text === '' ||
    text.startsWith('//') ||
    text.startsWith('/*') ||
    text.startsWith('*') ||
    text.startsWith('{/*') ||
    text.endsWith('*/') ||
    text.endsWith('*/}')
  );
};

const mergeBase = git('merge-base', base, 'HEAD').trim();
// merge-base 와 작업 트리를 비교해 커밋하지 않은 변경까지 포함합니다. -w 로 들여쓰기만 바뀐 줄은 뺍니다.
const diff = git('diff', '-U0', '-w', '--no-color', mergeBase, '--', ...SCOPES);

/** @type {Map<string, { lines: Set<number>, deleted: boolean }>} */
const changes = new Map();
let currentFile = null;
let hunk = null;

const flushHunk = () => {
  if (!hunk || !currentFile) return;
  const { removed, added, newStart, newCount } = hunk;
  if ([...removed, ...added].every(isCommentLine)) return;
  const entry = changes.get(currentFile);
  if (newCount === 0) entry.lines.add(Math.max(newStart, 1));
  for (let line = newStart; line < newStart + newCount; line += 1) {
    entry.lines.add(line);
  }
};

for (const line of diff.split('\n')) {
  if (line.startsWith('diff --git')) {
    flushHunk();
    hunk = null;
    currentFile = null;
  } else if (line.startsWith('--- ')) {
    // 삭제된 파일은 +++ 가 /dev/null 이라 이전 경로를 기억해 둡니다.
    if (line !== '--- /dev/null') currentFile = line.slice(6);
  } else if (line.startsWith('+++ ')) {
    const deleted = line === '+++ /dev/null';
    if (!deleted) currentFile = line.slice(6);
    if (!changes.has(currentFile)) {
      changes.set(currentFile, { lines: new Set(), deleted });
    }
  } else if (line.startsWith('@@')) {
    flushHunk();
    const match = /\+(\d+)(?:,(\d+))?/.exec(line);
    hunk = {
      removed: [],
      added: [],
      newStart: Number(match[1]),
      newCount: match[2] === undefined ? 1 : Number(match[2]),
    };
  } else if (hunk && line.startsWith('-')) {
    hunk.removed.push(line.slice(1));
  } else if (hunk && line.startsWith('+')) {
    hunk.added.push(line.slice(1));
  }
}
flushHunk();

// 새로 만든(아직 추적되지 않은) 파일은 diff 에 없으므로 전부 변경으로 봅니다.
for (const file of git(
  'ls-files',
  '--others',
  '--exclude-standard',
  '--',
  ...SCOPES
)
  .split('\n')
  .filter(Boolean)) {
  const source = readFileSync(path.join(repoRoot, file), 'utf8').split('\n');
  const lines = new Set();
  source.forEach((text, index) => {
    if (!isCommentLine(text)) lines.add(index + 1);
  });
  changes.set(file, { lines, deleted: false });
}

// ── 2. 코드 색인 (Feature 범위 · 사용처) ─────────────────────────

const configPath = path.join(webRoot, 'tsconfig.json');
const config = ts.getParsedCommandLineOfConfigFile(
  configPath,
  {},
  {
    ...ts.sys,
    onUnRecoverableConfigFileDiagnostic: (diagnostic) => {
      throw new Error(
        ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')
      );
    },
  }
);
const program = ts.createProgram(config.fileNames, config.options);
const checker = program.getTypeChecker();

const isTestOrStory = (fileName) => /\.(stories|test)\.tsx?$/.test(fileName);
const isIndexed = (fileName) =>
  !fileName.includes('/node_modules/') &&
  SCOPES.some((scope) => fileName.startsWith(path.join(repoRoot, scope))) &&
  !isTestOrStory(fileName);

const lineOf = (sourceFile, position) =>
  sourceFile.getLineAndCharacterOfPosition(position).line + 1;

const readFeatureIds = (attributes) => {
  const idAttribute = attributes.properties.find(
    (property) =>
      ts.isJsxAttribute(property) && property.name.getText() === 'data-feature'
  );
  const initializer = idAttribute?.initializer;
  if (!initializer) return [];
  if (ts.isStringLiteral(initializer)) return [initializer.text];
  const expression = ts.isJsxExpression(initializer)
    ? initializer.expression
    : undefined;
  if (expression && ts.isArrayLiteralExpression(expression)) {
    return expression.elements
      .filter(ts.isStringLiteral)
      .map((element) => element.text);
  }
  return [];
};

/** @type {Map<string, { start: number, end: number, ids: string[] }[]>} */
const rangesByFile = new Map();
/** 컴포넌트를 렌더하는 요소들 — 나중에 그 컴포넌트 안의 표식으로 범위를 만든다 */
const componentElements = [];
/** @type {Map<string, { start: number, end: number }[]>} */
const functionsByFile = new Map();
/** @type {Map<string, { file: string, line: number }[]>} 선언 파일 → 사용 위치 */
const usagesByFile = new Map();

for (const sourceFile of program.getSourceFiles()) {
  const fileName = sourceFile.fileName;
  if (!isIndexed(fileName)) continue;
  const ranges = [];
  const functions = [];
  const seen = new Set();

  const visit = (node) => {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) return;

    if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
      const opening = ts.isJsxElement(node) ? node.openingElement : node;
      const span = {
        start: lineOf(sourceFile, node.getStart(sourceFile)),
        end: lineOf(sourceFile, node.getEnd()),
      };
      const ids = readFeatureIds(opening.attributes);
      if (ids.length > 0) ranges.push({ ...span, ids });

      let symbol = checker.getSymbolAtLocation(opening.tagName);
      if (symbol && symbol.flags & ts.SymbolFlags.Alias) {
        symbol = checker.getAliasedSymbol(symbol);
      }
      const declaration = symbol?.declarations?.[0];
      if (declaration && isIndexed(declaration.getSourceFile().fileName)) {
        const declarationFile = declaration.getSourceFile();
        componentElements.push({
          file: fileName,
          ...span,
          hasOwnMarker: ids.length > 0,
          declarationFile: declarationFile.fileName,
          declarationStart: lineOf(
            declarationFile,
            declaration.getStart(declarationFile)
          ),
          declarationEnd: lineOf(declarationFile, declaration.getEnd()),
        });
      }
    }

    if (ts.isFunctionLike(node) && node.body) {
      functions.push({
        start: lineOf(sourceFile, node.getStart(sourceFile)),
        end: lineOf(sourceFile, node.getEnd()),
      });
    }

    if (ts.isIdentifier(node)) {
      let symbol = checker.getSymbolAtLocation(node);
      if (symbol && symbol.flags & ts.SymbolFlags.Alias) {
        symbol = checker.getAliasedSymbol(symbol);
      }
      for (const declaration of symbol?.declarations ?? []) {
        const target = declaration.getSourceFile().fileName;
        if (
          target === fileName ||
          !isIndexed(target) ||
          MARKER_FILES.has(target)
        ) {
          continue;
        }
        const line = lineOf(sourceFile, node.getStart(sourceFile));
        const key = `${target}\0${line}`;
        if (seen.has(key)) continue;
        seen.add(key);
        if (!usagesByFile.has(target)) usagesByFile.set(target, []);
        usagesByFile.get(target).push({ file: fileName, line });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  rangesByFile.set(fileName, ranges);
  functionsByFile.set(fileName, functions);
}

// 컴포넌트 안의 표식을 그 컴포넌트를 렌더하는 요소로 끌어올립니다.
// 컴포넌트가 다른 컴포넌트를 감싸는 경우가 있어 더 늘지 않을 때까지 반복합니다.
const derivedKeys = new Set();
for (let changedInPass = true; changedInPass; ) {
  changedInPass = false;
  for (const element of componentElements) {
    if (element.hasOwnMarker) continue;
    const ids = new Set();
    for (const range of rangesByFile.get(element.declarationFile) ?? []) {
      if (
        element.declarationStart <= range.start &&
        range.end <= element.declarationEnd
      ) {
        for (const id of range.ids) ids.add(id);
      }
    }
    if (ids.size === 0) continue;
    const key = `${element.file}\0${element.start}\0${element.end}\0${[...ids].sort().join()}`;
    if (derivedKeys.has(key)) continue;
    derivedKeys.add(key);
    rangesByFile.get(element.file)?.push({
      start: element.start,
      end: element.end,
      ids: [...ids],
    });
    changedInPass = true;
  }
}

// ── 3. 귀속 ─────────────────────────────────────────────────────

const innermostRange = (file, line) =>
  (rangesByFile.get(file) ?? [])
    .filter((range) => range.start <= line && line <= range.end)
    .sort((a, b) => a.end - a.start - (b.end - b.start))[0];

/** 그 줄을 감싸는 함수 중 표식을 품은 가장 가까운 함수의 범위들 */
const enclosingRanges = (file, line) => {
  const ranges = rangesByFile.get(file) ?? [];
  const functions = (functionsByFile.get(file) ?? [])
    .filter((fn) => fn.start <= line && line <= fn.end)
    .sort((a, b) => a.end - a.start - (b.end - b.start));
  for (const fn of functions) {
    const inside = ranges.filter(
      (range) => fn.start <= range.start && range.end <= fn.end
    );
    if (inside.length > 0) return inside;
  }
  return [];
};

const upwardMemo = new Map();

/** 파일 밖에서 이 파일을 쓰는 곳들이 닿는 기능 집합 */
const upward = (file, visiting = new Set()) => {
  if (upwardMemo.has(file)) return upwardMemo.get(file);
  if (visiting.has(file)) return new Set();
  visiting.add(file);
  const result = new Set();
  for (const usage of usagesByFile.get(file) ?? []) {
    for (const id of attribute(usage.file, usage.line, visiting))
      result.add(id);
  }
  visiting.delete(file);
  upwardMemo.set(file, result);
  return result;
};

/** 한 줄이 닿는 기능 집합 */
function attribute(file, line, visiting = new Set()) {
  const range = innermostRange(file, line);
  if (range) return new Set(range.ids);
  const result = new Set(upward(file, visiting));
  for (const own of enclosingRanges(file, line)) {
    for (const id of own.ids) result.add(id);
  }
  return result;
}

/** @type {Map<string, { status: 'changed' | 'possible', evidence: Map<string, number[]> }>} */
const impacts = new Map();
const unattributed = [];
const ignored = [];

const record = (id, status, file, line) => {
  const impact = impacts.get(id) ?? { status, evidence: new Map() };
  if (status === 'changed') impact.status = 'changed';
  const lines = impact.evidence.get(file) ?? [];
  lines.push(line);
  impact.evidence.set(file, lines);
  impacts.set(id, impact);
};

for (const [relativeFile, { lines, deleted }] of changes) {
  const file = path.join(repoRoot, relativeFile);
  if (lines.size === 0) continue;
  // 테스트·스토리는 화면 동작을 바꾸지 않으므로 기능 판정에서 뺍니다.
  if (isTestOrStory(file)) {
    ignored.push(relativeFile);
    continue;
  }
  if (deleted || !rangesByFile.has(file)) {
    unattributed.push({
      file: relativeFile,
      reason: deleted ? 'deleted' : 'not-indexed',
    });
    continue;
  }
  const orphanLines = [];
  for (const line of [...lines].sort((a, b) => a - b)) {
    const ids = attribute(file, line);
    if (ids.size === 0) {
      orphanLines.push(line);
      continue;
    }
    const status = ids.size === 1 ? 'changed' : 'possible';
    for (const id of ids) record(id, status, relativeFile, line);
  }
  if (orphanLines.length > 0) {
    unattributed.push({
      file: relativeFile,
      reason: 'no-feature',
      lines: orphanLines,
    });
  }
}

// ── 4. 출력 ─────────────────────────────────────────────────────

const compareDisplayNo = (a, b) => {
  const left = a.split('.').map(Number);
  const right = b.split('.').map(Number);
  for (let index = 0; index < Math.max(left.length, right.length); index += 1) {
    const diffValue = (left[index] ?? -1) - (right[index] ?? -1);
    if (diffValue !== 0) return diffValue;
  }
  return 0;
};

const toRanges = (lines) => {
  const sorted = [...new Set(lines)].sort((a, b) => a - b);
  const result = [];
  for (const line of sorted) {
    const last = result.at(-1);
    if (last && line === last[1] + 1) last[1] = line;
    else result.push([line, line]);
  }
  return result.map(([start, end]) =>
    start === end ? `${start}` : `${start}-${end}`
  );
};

const output = {
  base,
  mergeBase,
  features: [...impacts]
    .map(([id, { status, evidence }]) => ({
      id,
      displayNo: features.get(id)?.display_no ?? null,
      title: features.get(id)?.title ?? null,
      status,
      evidence: [...evidence].map(([file, lines]) => ({
        file,
        lines: toRanges(lines),
      })),
    }))
    .sort((a, b) =>
      compareDisplayNo(a.displayNo ?? '999', b.displayNo ?? '999')
    ),
  unattributed: unattributed.map((entry) =>
    entry.lines ? { ...entry, lines: toRanges(entry.lines) } : entry
  ),
  ignored,
};

console.log(JSON.stringify(output, null, 2));
