'use strict';

// tsserver 가 tsconfig 의 compilerOptions.plugins 를 보고 불러오는 언어 서비스 플러그인입니다.
// 에디터에서만 동작하고 tsc·빌드·CI 에는 영향이 없습니다.
//
// - hover: 'F-0154' 문자열 위에 "11.1.5 상단 바" 를 보여 줍니다.
// - 자동완성: TS 가 이미 주는 F-ID 항목에 표시 번호·제목을 덧붙입니다 (항목을 새로 만들지 않아 목록이 겹치지 않습니다).
// - 빠른 수정: data-feature 에 표시 번호("3.3.1")를 쓰면 생기는 타입 에러에서 기능 ID 로 바꿔 줍니다.
//
// 플러그인 오류가 TS 기능 전체를 망가뜨리지 않도록, 감싼 메서드는 실패하면 원래 결과를 그대로 돌려줍니다.
const path = require('node:path');

const {
  ID_PATTERN,
  DISPLAY_NO_PATTERN,
  createFeatureIndex,
  formatFeature,
  sortKeyOf,
} = require('./featureIndex.cjs');

const TYPE_NOT_ASSIGNABLE = 2322;
const FEATURE_ATTRIBUTE = 'data-feature';
const FIX_NAME = 'somesayFeatureId';

const init = ({ typescript: ts }) => {
  /** 위치를 품은 가장 안쪽 노드 */
  const findInnermostNode = (sourceFile, position) => {
    const visit = (node) => {
      if (position < node.getStart(sourceFile) || position >= node.getEnd()) {
        return undefined;
      }
      return ts.forEachChild(node, visit) ?? node;
    };
    return visit(sourceFile);
  };

  const isStringLike = (node) =>
    node !== undefined &&
    (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node));

  // 타입 에러 위치는 경우마다 다릅니다. 컴포넌트는 속성 이름·배열 요소에, DOM 요소는 태그 이름(<div)에 걸립니다.
  // 그래서 속성 안이면 그 속성을, 아니면 가장 가까운 JSX 요소의 data-feature 속성을 찾습니다.
  const findFeatureAttribute = (node) => {
    for (let current = node; current; current = current.parent) {
      if (ts.isJsxAttribute(current)) {
        return current.name.getText() === FEATURE_ATTRIBUTE
          ? current
          : undefined;
      }
      if (
        ts.isJsxOpeningElement(current) ||
        ts.isJsxSelfClosingElement(current)
      ) {
        return current.attributes.properties.find(
          (property) =>
            ts.isJsxAttribute(property) &&
            property.name.getText() === FEATURE_ATTRIBUTE
        );
      }
    }
    return undefined;
  };

  const collectStringLiterals = (node) => {
    const literals = [];
    const visit = (child) => {
      if (isStringLike(child)) literals.push(child);
      else ts.forEachChild(child, visit);
    };
    visit(node);
    return literals;
  };

  const textOf = (text) => [{ text, kind: 'text' }];

  const create = (info) => {
    const languageService = info.languageService;
    const log = (message) =>
      info.project.projectService.logger.info(`[somesay-feature] ${message}`);

    const featuresPathOption = info.config?.featuresPath;
    if (typeof featuresPathOption !== 'string') {
      log('featuresPath 설정이 없어 플러그인을 끕니다.');
      return languageService;
    }
    const featuresPath = path.resolve(
      path.dirname(info.project.getProjectName()),
      featuresPathOption
    );
    const features = createFeatureIndex(featuresPath, { log });

    const getSourceFile = (fileName) =>
      languageService.getProgram()?.getSourceFile(fileName);

    // 원래 결과를 먼저 구하고, 덧붙이다 실패하면 원래 결과를 돌려줍니다.
    const extend = (name, augment) =>
      function (...args) {
        const original = languageService[name](...args);
        try {
          return augment(original, ...args);
        } catch (error) {
          log(`${name} 처리 중 오류: ${error.stack ?? error}`);
          return original;
        }
      };

    const proxy = Object.create(null);
    for (const key of Object.keys(languageService)) {
      const member = languageService[key];
      proxy[key] =
        typeof member === 'function'
          ? (...args) => member.apply(languageService, args)
          : member;
    }

    proxy.getQuickInfoAtPosition = extend(
      'getQuickInfoAtPosition',
      (original, fileName, position) => {
        const sourceFile = getSourceFile(fileName);
        if (!sourceFile) return original;
        const node = findInnermostNode(sourceFile, position);
        if (!isStringLike(node) || !ID_PATTERN.test(node.text)) return original;

        const feature = features.findById(node.text);
        const headline = feature
          ? formatFeature(feature)
          : 'features.json 에 없는 기능 ID';
        const detail = feature
          ? `${feature.id} · ${feature.levelLabel}`
          : `${node.text} — features:update 로 목록을 갱신했는지 확인하세요.`;

        if (original) {
          return {
            ...original,
            documentation: [
              ...textOf(`${headline}\n\n${detail}`),
              ...(original.documentation ?? []),
            ],
          };
        }
        return {
          kind: ts.ScriptElementKind.string,
          kindModifiers: '',
          textSpan: {
            start: node.getStart(sourceFile),
            length: node.getWidth(sourceFile),
          },
          displayParts: textOf(headline),
          documentation: textOf(detail),
        };
      }
    );

    proxy.getCompletionsAtPosition = extend(
      'getCompletionsAtPosition',
      (original) => {
        if (!original) return original;
        let changed = false;
        const entries = original.entries.map((entry) => {
          if (!ID_PATTERN.test(entry.name)) return entry;
          const feature = features.findById(entry.name);
          if (!feature) return entry;
          changed = true;
          return {
            ...entry,
            labelDetails: { description: formatFeature(feature) },
            // 표시 번호나 제목을 입력해도 걸러지게 합니다 ("3.3" → F-0024).
            filterText: `${feature.displayNo} ${feature.title} ${feature.id}`,
            sortText: sortKeyOf(feature.displayNo),
          };
        });
        return changed ? { ...original, entries } : original;
      }
    );

    proxy.getCompletionEntryDetails = extend(
      'getCompletionEntryDetails',
      (original, _fileName, _position, entryName) => {
        if (!ID_PATTERN.test(entryName)) return original;
        const feature = features.findById(entryName);
        if (!feature) return original;
        const documentation = textOf(
          `${formatFeature(feature)}\n\n${feature.id} · ${feature.levelLabel}`
        );
        if (original) return { ...original, documentation };
        return {
          name: entryName,
          kind: ts.ScriptElementKind.string,
          kindModifiers: '',
          displayParts: textOf(entryName),
          documentation,
        };
      }
    );

    proxy.getCodeFixesAtPosition = extend(
      'getCodeFixesAtPosition',
      (original, fileName, start, _end, errorCodes) => {
        if (!errorCodes.includes(TYPE_NOT_ASSIGNABLE)) return original;
        const sourceFile = getSourceFile(fileName);
        if (!sourceFile) return original;
        // JSX 속성의 타입 에러는 속성 이름에, 배열 요소의 에러는 요소에 걸리므로 속성 전체를 살펴봅니다.
        const attribute = findFeatureAttribute(
          findInnermostNode(sourceFile, start)
        );
        if (!attribute?.initializer) return original;

        const fixes = [];
        for (const literal of collectStringLiterals(attribute.initializer)) {
          if (!DISPLAY_NO_PATTERN.test(literal.text)) continue;
          const feature = features.findByDisplayNo(literal.text);
          if (!feature?.isLeaf) continue;
          fixes.push({
            fixName: FIX_NAME,
            description: `${feature.id} (${formatFeature(feature)})로 바꾸기`,
            changes: [
              {
                fileName,
                textChanges: [
                  {
                    // 따옴표는 그대로 두고 안쪽 글자만 바꿉니다.
                    span: {
                      start: literal.getStart(sourceFile) + 1,
                      length: literal.getWidth(sourceFile) - 2,
                    },
                    newText: feature.id,
                  },
                ],
              },
            ],
          });
        }
        return fixes.length > 0 ? [...fixes, ...original] : original;
      }
    );

    log(`플러그인을 켰습니다. 기능 목록: ${featuresPath}`);
    return proxy;
  };

  return { create };
};

module.exports = init;
