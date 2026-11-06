// 백엔드 Swagger 를 받아 레포에 스냅샷으로 저장합니다.
// 스냅샷을 커밋해 두면 백엔드 변경이 PR diff 로 드러납니다.
// 사용: pnpm --filter @somesay/shared api:sync  (OPENAPI_URL 로 다른 서버를 지정할 수 있습니다)
import { writeFile } from 'node:fs/promises';

const OPENAPI_URL = process.env.OPENAPI_URL ?? 'https://somesay.kr/v3/api-docs';
const OUTPUT_PATH = new URL('../openapi/openapi.json', import.meta.url);

const response = await fetch(OPENAPI_URL);

if (!response.ok) {
  throw new Error(
    `OpenAPI 스펙을 받지 못했습니다: ${response.status} ${OPENAPI_URL}`
  );
}

const spec = await response.json();
await writeFile(OUTPUT_PATH, `${JSON.stringify(spec, null, 2)}\n`);
console.log(`저장 완료: ${OPENAPI_URL} → openapi/openapi.json`);
