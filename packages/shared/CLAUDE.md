# packages/shared — 서버 계약 레이어

프론트와 백엔드가 만나는 유일한 지점. **UI를 모르는 코드만** 둔다.
React 컴포넌트·훅은 여기 두지 않는다 (훅은 `apps/web/src/shared/hooks/`).

## 파일 배치

```
api/{도메인}/{함수명}.api.ts     API 호출 함수
api/client.ts                    axios 인스턴스 + 인터셉터
api/types.ts                     ApiResponse / ApiPage / ApiPageParams
api/buildApi.ts                  buildPath
constants/endpoints.ts           API_ENDPOINTS
domain/{도메인}/{도메인}.dto.ts     서버가 주고받는 모양
domain/{도메인}/{도메인}.types.ts   프론트가 쓰는 모양
domain/{도메인}/{도메인}.mapper.ts  dto ↔ types 변환
query/queryKeys.ts               QUERY_KEYS + 캐시 prefix 목록
query/{도메인}Cache.ts            캐시 직접 조작 유틸
utils/                           포맷터 등 순수 함수
```

도메인 이름은 **백엔드 컨트롤러**를 따른다. 화면 이름을 쓰지 않는다.

## 네이밍

| 대상               | 규칙                             | 예                                                        |
| ------------------ | -------------------------------- | --------------------------------------------------------- |
| API 함수           | HTTP 메서드 + 대상               | `fetchProductDetail` `postUserProduct` `patchProductWish` |
| 응답 DTO           | `{이름}Dto`                      | `ProductDetailDto`                                        |
| 요청 바디          | `{이름}RequestDto`               | `RecommendProductsWishRequestDto`                         |
| 쿼리/패스 파라미터 | `{함수명}Params` (`Dto` 안 붙임) | `FetchBrandProductsParams`                                |
| 프론트 타입        | `{이름}Type`                     | `ProductDetailType`                                       |
| 매퍼(응답)         | `map{DTO이름}`                   | `mapProductDetailDto`                                     |
| 매퍼(요청)         | `map{프론트타입}ToDto`           | `mapUserProductRequestToDto`                              |

반환 타입은 명시하지 않고 추론에 맡긴다. 매퍼가 타입을 이미 고정한다.

## 타입 설계

### 대원칙 — 이름은 서버를 따른다

**필드명을 바꾸려고 매퍼를 만들지 않는다.** 서버가 `avgRating`이면 프론트도 `avgRating`이다.

이름을 프론트 취향으로 바꾸면 매퍼가 생기고, 그 매퍼는 이름 두 벌을 영구히 관리하게 만든다.
실측상 DTO를 고친 커밋 20건 중 19건이 프론트 타입·컴포넌트까지 함께 고쳤다 —
변환 계층은 방화벽 역할을 하지 못하면서 비용만 냈다.

**서버 이름이 나쁘면 프론트에서 덮지 말고 백엔드에 수정을 요청한다.**
회신 전까지만 매퍼로 임시 처리하고, 사유와 함께 주석을 남긴다.

### 매퍼 — 3가지 경우에만 만든다

| 만드는 이유            | 예                                                       |
| ---------------------- | -------------------------------------------------------- |
| **표현 타입이 다르다** | `status: 'LIKE' \| 'NONE'` → `isHearted: boolean`        |
| **래핑을 벗긴다**      | `{ productResponses: [...] }` → 배열, `ApiPage.content`  |
| **구조를 바꾼다**      | `topReview: { creator, review }` 2단 중첩 → 화면용 한 단 |

이름만 다른 경우는 매퍼 사유가 아니다.

### DTO — 매퍼가 있을 때만 만든다

매퍼가 없으면 DTO 파일도 만들지 않는다. api 함수가 곧바로 `ApiResponse<XType>`을 받는다.
서버 응답 모양이 곧 프론트 타입이므로 둘을 따로 적을 이유가 없다.

**예외 — `isHearted`**
`userWish` / `status: 'LIKE'|'NONE'` → `isHearted: boolean` 변환은 유지한다.
boolean에 `is` 접두사가 있어야 읽히고, `query/productWishCache.ts`의 `patchWishNode`가
`{ productId, isHearted }` **모양에 의존**한다. 이름을 바꾸면 캐시 유틸 전체가 흔들린다.
그 계약을 `ProductWishStateType` 조각이 이름으로 들고 있다 — 이 조각을 쓰는 타입은 낙관적 갱신 대상이 된다.

### 파생 — 같은 개념을 두 번 적지 않는다

도메인마다 **미니멀 코어 하나**를 두고(`ProductBasicType` `CreatorType`) 화면용 타입은 거기서 파생한다.
코어에는 **그 도메인이라면 반드시 있는 필드만** 넣는다. 화면 하나가 더 필요하다고 코어를 넓히지 않는다.

| 하는 일                           | 쓰는 것                   | 예                                                                    |
| --------------------------------- | ------------------------- | --------------------------------------------------------------------- |
| 필드를 더한다                     | `extends`                 | `ProductCardType extends ProductBasicType, ProductWishStateType`      |
| 여러 타입이 같은 필드 묶음을 쓴다 | **조각 + 다중 `extends`** | `ProductCategoryRefType` `ProductSkinFitType`                         |
| 부분집합을 고른다                 | `Pick`                    | `BasicCreatorProfileType = Pick<CreatorType, ...>`                    |
| 소수를 뺀다                       | `Omit`                    | `CreatorRankingUpDownType extends Omit<CreatorType, 'personalColor'>` |
| 타입을 바꾼다                     | `Omit` + 재선언           | 원본과 **실제로 달라질 때만**                                         |

**조각은 3곳부터 만든다.** 2곳이면 복제해 둔다 (루트 `CLAUDE.md` CORE RULE 6과 같은 기준).
조각 이름은 필드 목록이 아니라 **개념**이어야 한다 — `ProductSkinFitType`(○) / `ProductExtraFieldsType`(×).

**상속은 최대 2단.** 3단이 필요하면 계층이 아니라 조각으로 풀 신호다.
`BrandProductType`이 `ProductSearchResultType`을 거쳐 4단으로 뻗어 있었다 —
**연동된 타입이 미연동(mock) 타입을 상속하면 그쪽 서버 계약이 정해질 때 함께 흔들린다.**

**중간 고리를 만들지 않는다.** 소비처가 자기 파일뿐인 상속 층(구 `ProductWishType`)은
읽는 사람에게 한 단계를 더 태울 뿐이다. 조각으로 바꾸거나 없앤다.

`Omit` 후 같은 타입으로 다시 선언하면 아무것도 하지 않는 코드다. 미래를 대비한 자리라면 이유를 주석으로 남긴다.

### 중첩 vs 평탄화 — 서버 구조를 따른다

서버가 평탄하게 주면 평탄하게 받는다. 구조를 바꾸는 순간 매퍼가 생기므로, **화면이 쓰기 어려울 때만** 바꾼다.

평탄한 채로 중복을 없애려면 상속을 쓴다. 서버 DTO가 상속으로 합쳐놨다면 프론트도 같은 방식으로 합친다.

```ts
// Do — 서버가 크리에이터 필드를 평탄하게 주므로 구조를 유지하되 상속으로 중복만 없앤다
interface ProductReviewType extends BasicCreatorProfileType {
  reviewId: number;
  content: string;
}

// Don't — 같은 필드를 다시 손으로 적는다
interface ProductReviewType {
  reviewId: number;
  creatorName: string;
  profileImgUrl: string;
  trustScore: number;
}
```

### 표기

`Img`로 통일한다 (`profileImgUrl` `brandImgUrl` `productImgUrl`). 서버 표기와 같다.
`Image`로 늘려 쓰지 않는다 — 그 한 글자 차이가 매퍼 하나를 만든다.

**백엔드와 합의한 네이밍 규칙** (합의되면 여기에 고정한다)

```
boolean  is* / has* / can*     URL  *Url      개수  *Count
식별자    *Id                   목록  복수형     날짜  *At (ISO 8601)
```

## endpoints

- 도메인별 **중첩 객체**로 쓴다. 전체 경로를 값에 담고, 조각을 문자열로 이어붙이지 않는다.
- 경로 변수는 `:param` 표기. 치환은 `buildPath(경로, { param })`만 사용한다.
- 각 URL 위에 "무엇을 위한 API인지" 한 줄 주석.

```ts
export const API_ENDPOINTS = {
  PRODUCT: {
    // 제품 상세 정보를 조회하기 위한 API URL입니다.
    DETAIL: '/products/:productId',
    REVIEW_OVERVIEW: '/products/:productId/review-overview',
  },
} as const;
```

## API 함수

- 응답은 `ApiResponse<T>` / 페이지네이션은 `ApiPageResponse<T>`로 받고 **`response.data.data`를 벗겨서** 반환한다.
- 매퍼가 있으면 매핑된 프론트 타입을 반환한다. 원시 DTO를 밖으로 내보내지 않는다.
- 인자 순서는 **path 파라미터 먼저, 나머지는 `params` 객체 하나** — `fetchProductReviews(productId, params)`.
- 쿼리스트링은 `{ params }`, 바디는 두 번째 인자(`post`/`put`/`patch`).
- **변환 로직을 api 파일에 두지 않는다.** 필터→파라미터 같은 변환은 `domain/{도메인}/{도메인}.mapper.ts`로.

## queryKeys

파일 상단 주석이 규칙의 원본이다. 요약하면:

- 파라미터를 받는 키는 `_ALL()` prefix 팩토리를 **짝으로** 둔다.
- `invalidateQueries` / `setQueriesData` 필터에는 **반드시 `_ALL()`**을 쓴다.
  파라미터 팩토리를 필터로 쓰면 `{}`와 실제 키가 매칭되지 않아 조용히 실패한다.
- `ALL` 바로 아래에는 값이 아니라 리터럴 세그먼트를 둔다.

## 캐시 직접 조작

낙관적 갱신이 여러 쿼리에 걸치면 훅에 흩지 말고 `query/{도메인}Cache.ts`로 뺀다.
`productWishCache.ts`가 기준 구현이다 — **무한 스크롤 쿼리는 invalidate하지 말고 국소 패치**한다
(전 페이지가 순차 리페치되며 페이지 경계가 흔들려 항목이 중복·누락된다).
바뀐 가지가 없으면 원본 참조를 그대로 반환해 불필요한 리렌더를 막는다.

찜처럼 여러 쿼리에 실리는 상태는 `queryKeys.ts`의 prefix 목록(`WISH_QUERY_PREFIXES`)으로 관리한다.
**상품 카드를 담는 쿼리를 새로 만들면 그 목록에 추가한다.**

## 내보내기

새 파일은 `src/index.ts`에 named export로 등록한다. `export *`를 쓰지 않는다.
