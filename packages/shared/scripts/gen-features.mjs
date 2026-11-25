// features/features.json 스냅샷으로 기능 ID 타입을 만듭니다.
// 사용: pnpm --filter @somesay/shared features:gen  (features:update 가 저장 후 자동으로 부릅니다)
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const INPUT_PATH = new URL('../features/features.json', import.meta.url);
const OUTPUT_DIR = new URL('../src/features/generated/', import.meta.url);
const OUTPUT_PATH = new URL('features.ts', OUTPUT_DIR);

const toUnion = (features) =>
  features.length === 0
    ? '  never'
    : features
        .map(
          ({ id, display_no, title }) => `  | '${id}' // ${display_no} ${title}`
        )
        .join('\n');

export const generateFeatureTypes = async () => {
  const features = JSON.parse(await readFile(INPUT_PATH, 'utf8'));
  // 진행 상태는 소분류 단위로만 기록하므로, <Feature> 에는 소분류(1.1.1 꼴)만 허용합니다.
  const leaves = features.filter(
    ({ display_no }) => display_no.split('.').length === 3
  );

  const source = `// 자동 생성 파일입니다. 직접 고치지 말고 features:update 로 갱신하세요.
// 기능 ID 는 바뀌지 않고, 옆 주석의 표시 번호·제목은 생성 시점의 값입니다.

export type FeatureId =
${toUnion(features)};

export type LeafFeatureId =
${toUnion(leaves)};
`;

  await mkdir(OUTPUT_DIR, { recursive: true });
  await writeFile(OUTPUT_PATH, source);
  console.log(
    `생성 완료: 기능 ${features.length}건 (소분류 ${leaves.length}건) → src/features/generated/features.ts`
  );
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await generateFeatureTypes();
}
