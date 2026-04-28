#!/usr/bin/env node
/**
 * Storybook 스토리 자동 생성 스크립트
 *
 * Usage:
 *   node scripts/generate-stories.mjs [options]
 *
 * Options:
 *   --path <path>   src/ 기준 대상 경로 (기본: shared/components)
 *   --dry-run       파일 생성 없이 결과만 출력
 *   --force         기존 스토리 파일 덮어쓰기
 */

import ts from 'typescript';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// ─── 경로 설정 ────────────────────────────────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WEB_ROOT = path.resolve(__dirname, '..');
const SRC_ROOT = path.join(WEB_ROOT, 'src');
const WORKSPACE_ROOT = path.resolve(WEB_ROOT, '../..');
const SHARED_INDEX = path.join(WORKSPACE_ROOT, 'packages/shared/src/index.ts');

// ─── CLI 파싱 ─────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const DRY_RUN = argv.includes('--dry-run');
const FORCE = argv.includes('--force');
const pathIdx = argv.indexOf('--path');
const TARGET_DIR =
  pathIdx !== -1
    ? path.resolve(SRC_ROOT, argv[pathIdx + 1])
    : path.join(SRC_ROOT, 'shared/components');

// ─── TypeScript 프로그램 생성 ─────────────────────────────────────────────────
function buildProgram(filePaths) {
  const configFile = ts.findConfigFile(WEB_ROOT, ts.sys.fileExists, 'tsconfig.json');
  const { config } = ts.readConfigFile(configFile, ts.sys.readFile);
  const { options } = ts.parseJsonConfigFileContent(config, ts.sys, WEB_ROOT);

  return ts.createProgram(filePaths, {
    ...options,
    baseUrl: WEB_ROOT,
    // @somesay/shared → packages/shared/src/index.ts 로 해석
    paths: {
      '@/*': [path.join(SRC_ROOT, '*')],
      '@somesay/shared': [SHARED_INDEX],
    },
    noEmit: true,
    skipLibCheck: true,
  });
}

// ─── 컴포넌트 파일 수집 ───────────────────────────────────────────────────────
function collectComponentFiles(dir) {
  const SKIP = /\.(stories|test|spec)\.[tj]sx?$|^index\.[tj]sx?$|\.types\.ts$/;
  const results = [];

  function walk(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.isFile() && entry.name.endsWith('.tsx') && !SKIP.test(entry.name)) {
        results.push(full);
      }
    }
  }

  walk(dir);
  return results;
}

// ─── Props 분석 ───────────────────────────────────────────────────────────────
function extractPropInfo(checker, sym, locationNode) {
  const propType = checker.getTypeOfSymbolAtLocation(sym, locationNode);
  const typeStr = checker.typeToString(propType);
  const isOptional = !!(sym.flags & ts.SymbolFlags.Optional);

  const isFunction =
    propType.getCallSignatures().length > 0 ||
    typeStr.includes('=>') ||
    typeStr.startsWith('(');

  const isArray = checker.isArrayType(propType) || typeStr.endsWith('[]');

  const isReactNode = /^ReactNode$|^React\.ReactNode$|^ReactElement/.test(typeStr);

  let unionValues = null;
  if (propType.isUnion()) {
    const literals = propType.types.filter(t => t.isStringLiteral());
    if (literals.length > 0 && literals.length === propType.types.length) {
      unionValues = literals.map(t => t.value);
    }
  }

  return { name: sym.name, type: typeStr, tsType: propType, isOptional, isFunction, isArray, isReactNode, unionValues };
}

function resolveProps(checker, paramNode) {
  const type = checker.getTypeAtLocation(paramNode);
  return checker.getPropertiesOfType(type).map(sym => extractPropInfo(checker, sym, paramNode));
}

// ─── argTypes 생성 ────────────────────────────────────────────────────────────
function toArgType(prop) {
  if (prop.isFunction) return null; // 함수는 action으로 처리
  if (prop.unionValues) return `{ control: 'select', options: ${JSON.stringify(prop.unionValues)} }`;
  if (prop.type === 'string') return `{ control: 'text' }`;
  if (prop.type === 'number') return `{ control: 'number' }`;
  if (prop.type === 'boolean') return `{ control: 'boolean' }`;
  if (prop.isArray) return `{ control: 'object' }`;
  return `{ control: 'object' }`;
}

// ─── Default args 기본값 생성 ─────────────────────────────────────────────────

// 중첩 객체 재귀 분석 (depth 제한으로 무한 순환 방지)
function resolveNestedDefault(checker, tsType, locationNode, depth = 0) {
  if (depth > 2) return `{}`;

  const props = checker.getPropertiesOfType(tsType);
  if (!props || props.length === 0) return `{}`;

  const entries = props
    .filter(sym => !(sym.flags & ts.SymbolFlags.Optional))
    .map(sym => {
      const info = extractPropInfo(checker, sym, locationNode);
      return `${info.name}: ${toDefaultValue(info, checker, locationNode, depth + 1)}`;
    });

  return entries.length > 0 ? `{ ${entries.join(', ')} }` : `{}`;
}

function toDefaultValue(prop, checker, locationNode, depth = 0) {
  if (prop.isFunction) return `() => {}`;
  if (prop.isReactNode) return `'내용'`;
  if (prop.unionValues) return `'${prop.unionValues[0]}'`;
  if (prop.type === 'string') return smartStringDefault(prop.name);
  if (prop.type === 'number') return smartNumberDefault(prop.name);
  if (prop.type === 'boolean') return smartBooleanDefault(prop.name);
  if (prop.isArray) return `[]`;

  // 중첩 객체: TS 타입 checker로 재귀 분석
  if (checker && locationNode && prop.tsType && !prop.isFunction) {
    return resolveNestedDefault(checker, prop.tsType, locationNode, depth);
  }

  return `{}`;
}

function smartStringDefault(name) {
  const n = name.toLowerCase();
  if (/label|title|text|content/.test(n)) return `'샘플 텍스트'`;
  if (/url|src|href|image/.test(n)) return `'https://placehold.co/100'`;
  if (/brand/.test(n)) return `'브랜드명'`;
  if (/name/.test(n)) return `'이름'`;
  if (/nickname/.test(n)) return `'닉네임'`;
  return `'텍스트'`;
}

function smartNumberDefault(name) {
  const n = name.toLowerCase();
  if (/price/.test(n)) return `10000`;
  if (/rating|score/.test(n)) return `4.5`;
  if (/rank/.test(n)) return `1`;
  if (/id/.test(n)) return `1`;
  return `0`;
}

function smartBooleanDefault(name) {
  const n = name.toLowerCase();
  if (/open|visible|show|active|enabled/.test(n)) return `true`;
  return `false`;
}

// ─── 스토리 title 생성 ────────────────────────────────────────────────────────
function toStoryTitle(filePath, targetDir) {
  // targetDir → 섹션명 (components 세그먼트 제외)
  const dirParts = path.relative(SRC_ROOT, targetDir).split(path.sep);
  const section = dirParts
    .filter(p => p !== 'components')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('/');

  // targetDir 기준 파일 경로
  const rel = path.relative(targetDir, filePath).replace(/\.tsx$/, '');
  const filePart = rel
    .split(path.sep)
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('/');

  return section ? `${section}/${filePart}` : filePart;
}

// ─── 스토리 파일 내용 생성 ────────────────────────────────────────────────────
function generateStoryContent(componentName, title, props, checker, locationNode) {
  const argTypesLines = props
    .map(p => {
      const at = toArgType(p);
      return at ? `    ${p.name}: ${at},` : null;
    })
    .filter(Boolean);

  // Default story: required props만 args에 포함
  const defaultArgsLines = props
    .filter(p => !p.isOptional)
    .map(p => `    ${p.name}: ${toDefaultValue(p, checker, locationNode)},`);

  const lines = [
    `import type { Meta, StoryObj } from '@storybook/react-vite';`,
    ``,
    `import { ${componentName} } from './${componentName}';`,
    ``,
    `const meta: Meta<typeof ${componentName}> = {`,
    `  title: '${title}',`,
    `  component: ${componentName},`,
    `  tags: ['autodocs'],`,
    argTypesLines.length > 0
      ? `  argTypes: {\n${argTypesLines.join('\n')}\n  },`
      : null,
    `};`,
    ``,
    `export default meta;`,
    `type Story = StoryObj<typeof ${componentName}>;`,
    ``,
    `export const Default: Story = {`,
    defaultArgsLines.length > 0
      ? `  args: {\n${defaultArgsLines.join('\n')}\n  },`
      : null,
    `};`,
    ``,
  ];

  return lines.filter(l => l !== null).join('\n');
}

// ─── 메인 ─────────────────────────────────────────────────────────────────────
if (!fs.existsSync(TARGET_DIR)) {
  console.error(`❌ 경로를 찾을 수 없습니다: ${TARGET_DIR}`);
  process.exit(1);
}

const allFiles = collectComponentFiles(TARGET_DIR);
const toProcess = allFiles.filter(f => {
  const storyFile = f.replace(/\.tsx$/, '.stories.tsx');
  return FORCE || !fs.existsSync(storyFile);
});

const skippedExisting = allFiles.length - toProcess.length;

if (toProcess.length === 0) {
  console.log(`\n모든 컴포넌트에 스토리가 이미 존재합니다. (--force 로 재생성 가능)\n`);
  process.exit(0);
}

console.log(`\n📖 스토리 생성 중... (${toProcess.length}개 대상)\n`);
if (DRY_RUN) console.log('  [dry-run 모드 — 파일을 생성하지 않습니다]\n');

const program = buildProgram(toProcess);
const checker = program.getTypeChecker();

const results = { created: [], skipped: [], failed: [] };

for (const filePath of toProcess) {
  const sourceFile = program.getSourceFile(filePath);
  if (!sourceFile) {
    results.failed.push({ file: filePath, reason: '소스 파일 로드 실패' });
    continue;
  }

  const components = [];

  ts.forEachChild(sourceFile, node => {
    if (!ts.isVariableStatement(node)) return;

    const isExported = node.modifiers?.some(
      m => m.kind === ts.SyntaxKind.ExportKeyword,
    );
    if (!isExported) return;

    for (const decl of node.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name)) continue;
      if (!decl.initializer || !ts.isArrowFunction(decl.initializer)) continue;

      const name = decl.name.text;
      if (!/^[A-Z]/.test(name)) continue; // PascalCase = React 컴포넌트

      const param = decl.initializer.parameters[0];
      if (!param) continue;

      try {
        const props = resolveProps(checker, param);
        components.push({ name, props, param });
      } catch (e) {
        results.failed.push({
          file: filePath,
          reason: `Props 분석 실패 (${name}): ${e.message}`,
        });
      }
    }
  });

  if (components.length === 0) {
    results.skipped.push(filePath);
    continue;
  }

  for (const { name, props, param } of components) {
    const title = toStoryTitle(filePath, TARGET_DIR);
    const content = generateStoryContent(name, title, props, checker, param);
    const storyPath = filePath.replace(/\.tsx$/, '.stories.tsx');

    if (DRY_RUN) {
      console.log('─'.repeat(60));
      console.log(`📄 ${path.relative(WEB_ROOT, storyPath)}`);
      console.log('─'.repeat(60));
      console.log(content);
    } else {
      fs.writeFileSync(storyPath, content, 'utf-8');
      results.created.push(storyPath);
      console.log(`  ✅ ${path.relative(WEB_ROOT, storyPath)}`);
    }
  }
}

// ─── 결과 요약 ────────────────────────────────────────────────────────────────
console.log('\n' + '─'.repeat(60));
if (!DRY_RUN) {
  console.log(`✅ 생성: ${results.created.length}개`);
}
if (skippedExisting > 0) {
  console.log(`⏭️  스킵 (이미 존재): ${skippedExisting}개  (--force 로 재생성 가능)`);
}
if (results.skipped.length > 0) {
  console.log(`⏭️  스킵 (컴포넌트 없음): ${results.skipped.length}개`);
  results.skipped.forEach(f => console.log(`     ${path.relative(WEB_ROOT, f)}`));
}
if (results.failed.length > 0) {
  console.log(`❌ 실패: ${results.failed.length}개`);
  results.failed.forEach(({ file, reason }) =>
    console.log(`     ${path.relative(WEB_ROOT, file)} — ${reason}`),
  );
}
console.log('─'.repeat(60) + '\n');
