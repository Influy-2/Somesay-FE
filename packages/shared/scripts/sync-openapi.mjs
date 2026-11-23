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

// 관리자 API(/api/v1/admin/...)는 앱에서 호출하지 않으므로 스냅샷에서 뺍니다.
// 이렇게 하면 생성 타입(openapi.ts)에도 관리자 경로가 들어가지 않습니다.
// (관리자 전용 스키마는 components 에 남을 수 있지만, 경로가 없어 사용할 일이 없습니다.)
const ADMIN_PATH_PREFIX = '/api/v1/admin';
spec.paths = Object.fromEntries(
  Object.entries(spec.paths).filter(
    ([path]) => !path.startsWith(ADMIN_PATH_PREFIX)
  )
);

await writeFile(OUTPUT_PATH, `${JSON.stringify(spec, null, 2)}\n`);
console.log(`저장 완료: ${OPENAPI_URL} → openapi/openapi.json`);
