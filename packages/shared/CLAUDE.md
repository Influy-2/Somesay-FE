# packages/shared — 서버 계약 레이어

프론트와 백엔드가 만나는 유일한 지점. **UI를 모르는 코드만** 둔다.
React 컴포넌트·훅은 여기 두지 않는다 (훅과 API 클라이언트는 `apps/web/src/shared/`).

## 원본은 백엔드 Swagger다

서버 타입·경로·파라미터는 손으로 쓰지 않는다. Swagger를 받아 생성한다.

```
pnpm --filter @somesay/shared api:sync     # api:fetch(스냅샷 저장) + api:gen(타입 생성)
```

- `openapi/openapi.json` — 스냅샷. **커밋한다.** 백엔드 변경이 PR diff로 드러난다.
  관리자 경로(`/api/v1/admin`)는 `scripts/sync-openapi.mjs`가 뺀다. 다른 서버는 `OPENAPI_URL`로 지정한다.
- `src/api/generated/openapi.ts` — 생성물. **직접 고치지 않는다.**
- 백엔드가 바뀌었다고 하면 먼저 `api:sync` 후 `git diff src/api/generated/openapi.ts`로 무엇이 바뀌었는지 본다.
  타입 에러가 영향 범위다 — `pnpm type-check`.

## 파일 배치

```
openapi/openapi.json            Swagger 스냅샷
scripts/sync-openapi.mjs        스냅샷 받기
src/api/generated/openapi.ts    생성 타입 (paths, components)
src/api/schema.ts               서버 타입 별칭 — 단일 진입점
src/api/types.ts                ApiErrorResponse (스펙에 없어 손으로 둠)
src/domain/{도메인}/{도메인}.types.ts   프론트 전용 타입 (…Type)
src/query/{도메인}Cache.ts       캐시 직접 조작 유틸
src/constants/                  선택지·라벨 표
src/utils/                      포맷터·페이지 헬퍼 등 순수 함수
```

API 클라이언트·조회 훅은 `apps/web/src/shared/api/`, 도메인별 훅은 `apps/web/src/shared/hooks/{도메인}/`에 있다.
**엔드포인트 상수·api 함수 파일·응답 DTO·매퍼·쿼리키 상수를 만들지 않는다.** 전부 스펙에서 추론된다.

## 타입

### 서버 타입 — `schema.ts` 별칭

```ts
type Schemas = components['schemas'];
export type ProductCard = Schemas['ProductCard'];
```

- 별칭 이름은 **Swagger 스키마 이름 그대로** 둔다. 접미사 없음 = 서버 모양.
- **실제로 쓰는 스키마만** 추가하고 `src/index.ts`에도 등록한다.
- 쿼리 파라미터 enum처럼 스키마가 아닌 값은 `paths`에서 꺼낸다 (`ProductSortType`).
- 필드 이름을 프론트에서 바꾸지 않는다. **서버 이름이 나쁘면 백엔드에 수정을 요청한다.**

### 프론트 전용 타입 — `…Type`

서버 응답이 **아닌** 것만 만든다 — 화면 상태, 화면이 계산해 더한 값, 아직 API가 없는 화면의 임시 모양.

| 하는 일                    | 쓰는 것 | 예                                                                   |
| -------------------------- | ------- | -------------------------------------------------------------------- |
| 여러 응답의 공통 필드 묶음 | `Pick`  | `BasicCreatorProfileType = Pick<CreatorRankingResponse, ...>`        |
| 계산한 값을 더한다         | `&`     | `CreatorRankingUpDownType = CreatorRankingResponse & { rankChange }` |

- **조각은 3곳부터 만든다.** 2곳이면 각 컴포넌트에서 `Pick` 한다 (루트 `CLAUDE.md` CORE RULE 6과 같은 기준).
- 조각 이름은 필드 목록이 아니라 **개념**이어야 한다 — `BasicCreatorProfileType`(○) / `CreatorExtraFieldsType`(×).
- 아직 API가 없어 손으로 쓴 타입은 그 사실과 `TODO`를 주석으로 남긴다 (`recommendation.types.ts`).

### 변환은 거의 하지 않는다

응답은 서버 모양 그대로 화면까지 간다. 이름만 다른 경우는 변환 사유가 아니다.
변환이 꼭 필요하면 **쓰는 곳 가까이**에 둔다.

| 변환               | 어디                                                        |
| ------------------ | ----------------------------------------------------------- |
| 응답에 값을 더한다 | 조회 훅의 `select` (`withRankChange`)                       |
| 요청 값을 바꾼다   | mutation 훅 안의 상수 표 (`USER_PRODUCT_STATUS_TO_REQUEST`) |
| 페이지 형식 차이   | `utils/pagination.ts` (`flattenPages` `getTotalCount`)      |

### nullable — 스펙을 믿는다

- 스펙이 `T | null`이면 그대로 받는다. 컴포넌트 props도 `T | null`로 넓힌다. `!`·`as`로 지우지 않는다.
- 화면 처리 기준 — 이미지는 `<img>` 대신 빈 박스(`bg-grey01`/`bg-grey02`), 값(별점·순위·영상 정보 등)은 그 표시를 숨긴다.
  `${x}` 템플릿·aria-label에 null이 섞이지 않게 한다 (`"null위"` `"별점 null점"`).
- **스펙은 non-null인데 운영에서 null이 오면** 백엔드에 nullable 표시를 요청한다.
  회신 전까지만 방어 코드를 두고 "타입상 불필요해 보여도 운영 null 방어"라고 주석을 남긴다 (`trustScore.utils.ts`).

### 표기

`Img`로 통일한다 (`creatorProfileImgUrl` `brandImgUrl` `productImgUrl`). 서버 표기와 같다.

**백엔드와 합의한 네이밍 규칙** (합의되면 여기에 고정한다)

```
boolean  is* / has* / can*     URL  *Url      개수  *Count
식별자    *Id                   목록  복수형     날짜  *At (ISO 8601)
```

## 쿼리 키

`openapi-react-query`가 `['get', 경로, init]`으로 **자동 생성**한다. 키 상수를 만들지 않는다.

- 직접 가리킬 때는 web의 `apiKey(경로, params?)`를 쓴다. 경로가 스펙의 GET 경로로 제한돼 오타가 컴파일 에러로 잡힌다.
  TanStack Query는 키 안의 객체도 부분 매칭하므로 params 일부만 넘겨도 된다.
- 한 리소스 밑 여러 경로(`/products/{productId}/…`)를 묶을 때는 `isUnderResource(경로, pathParams)` predicate를 쓴다.
- shared는 web을 import할 수 없어 `query/`에서는 같은 모양(`['get', 경로]`)을 직접 만든다.

## 캐시 직접 조작

낙관적 갱신이 여러 쿼리에 걸치면 훅에 흩지 말고 `query/{도메인}Cache.ts`로 뺀다.
`productWishCache.ts`가 기준 구현이다 — **무한 스크롤 쿼리는 invalidate하지 말고 국소 패치**한다
(전 페이지가 순차 리페치되며 페이지 경계가 흔들려 항목이 중복·누락된다).
바뀐 가지가 없으면 원본 참조를 그대로 반환해 불필요한 리렌더를 막는다.
캐시에는 응답 래퍼(`{ code, message, data }`)째 저장된다는 점을 기억한다.

찜 상태는 `{ productId, isWished }` **모양**으로 캐시 트리에서 찾는다.
찜이 실리는 GET 경로는 `WISH_QUERY_PREFIXES`로 관리한다.
**상품 카드나 상품 상세를 담는 GET을 새로 쓰면 그 목록에 경로를 추가한다.**

## 내보내기

새 별칭·타입·유틸은 `src/index.ts`에 named export로 등록한다. 서버 타입은 `export type`으로 낸다.
