---
name: api-integration
description: 백엔드 API를 Somesay 프론트엔드에 연동하거나 백엔드 스펙 변경을 반영할 때 사용한다. Swagger 스냅샷 갱신(api:sync)·서버 타입 별칭·React Query 훅을 규약대로 만든다. "이 API 붙여줘", "이 응답으로 훅 만들어줘", "백엔드 바뀌었어", 스웨거/DTO를 붙여넣은 요청에 해당한다.
---

# API 연동 워크플로우

타입·쿼리 키·캐시 규칙은 `packages/shared/CLAUDE.md`에 있다. 이 문서는 **순서와 판단 기준**만 다룬다.

경로·파라미터·바디·응답 타입은 전부 Swagger에서 생성·추론된다.
**엔드포인트 상수·api 함수 파일·응답 DTO·매퍼·쿼리키 상수를 만들지 않는다.**

## 1. 스펙부터 맞춘다

```
pnpm --filter @somesay/shared api:sync
git diff packages/shared/src/api/generated/openapi.ts
```

- 붙일 경로가 생성 타입(`paths`)에 있는지 확인한다. **없으면 백엔드 배포 여부를 묻는다.** 손으로 타입을 쓰지 않는다.
- 스펙 변경 반영 요청이면 diff에서 바뀐 필드를 정리하고 `pnpm type-check` 에러로 영향 범위를 잡는다.
  타입 에러가 안 나는 위험(템플릿 문자열·aria-label에 null)도 바뀐 필드 이름으로 검색해 찾는다.
- 필수: 어느 경로·메서드인지, 어느 화면에서 쓰는지. 불확실하면 묻는다.

## 2. 계획 제시 → 승인 대기

코드를 쓰기 전에 한국어로 제시한다.

```
## 구현 계획
- 경로: GET /api/v1/... (스펙의 응답 스키마 이름)
- 변경 파일: (경로 목록)
- 훅 이름: useFetchX / usePostX / use{도메인동작}
- schema.ts 별칭 추가: (컴포넌트가 타입을 직접 써야 할 때만)
- 변환 필요 여부: 필요하면 select / mutation 상수 표 중 어디에 둘지와 이유
- 서버 이름·nullable 중 이상한 것: (있으면 백엔드에 요청할 목록)
- React Query 옵션: (아래 기준에 따른 추천 + 이유)
- 찜 캐시: 상품 카드·상세를 담으면 WISH_QUERY_PREFIXES 추가
- 확인 필요: (불명확한 점)
```

승인 전에 파일을 만들지 않는다.

## 3. 구현 순서

1. `api:sync` 결과(스냅샷·생성 타입)를 커밋 대상에 포함한다
2. 컴포넌트가 응답 타입을 써야 하면 `packages/shared/src/api/schema.ts`에 별칭 → `src/index.ts`에 `export type`
3. `apps/web/src/shared/hooks/{도메인}/use{X}.ts` — 아래 패턴
4. 상품 카드·상세를 담는 GET이면 `packages/shared/src/query/productWishCache.ts`의 `WISH_QUERY_PREFIXES`에 경로 추가
5. barrel 등록 — `shared/hooks/index.ts`
6. `pnpm type-check`

## 4. React Query 옵션 판단

전역 기본값이 `App.tsx`에 있다 (`staleTime` 5분, `gcTime` 30분, `retry` 1, `throwOnError` true).
**전역과 같은 값을 다시 쓰지 않는다.** 다를 때만 쓰고 이유를 주석으로 남긴다.

| 옵션                  | 언제                                                    |
| --------------------- | ------------------------------------------------------- |
| `staleTime` ↑         | 카테고리·브랜드 정보처럼 거의 안 변하는 데이터          |
| `staleTime` ↓         | 랭킹·찜처럼 자주 바뀌거나 mutation 영향을 받는 데이터   |
| `enabled`             | path 파라미터가 없거나 유효하지 않을 때                 |
| `retry: false`        | 실패를 즉시 사용자에게 알려야 하는 요청 (로그인, 저장)  |
| `throwOnError: false` | 실패를 섹션 안에서 안내할 때                            |
| `select`              | 응답에 계산값을 더하거나 일부만 쓸 때 (참조를 고정한다) |

쿼리 키는 `['get', 경로, init]`으로 자동 생성되므로 **init에 응답을 바꾸는 값을 전부 넣으면** 키도 맞는다.
같은 경로를 `useApiQuery`와 `useApiInfiniteQuery`로 섞어 쓰지 않는다 (키가 겹친다).

## 5. 훅 작성 패턴

훅은 `@/shared/api`의 도구만 쓴다. `$api`·`fetch`를 화면에서 직접 부르지 않는다.

**단건 조회** — `useApiQuery`. 응답 래퍼를 벗긴 `data`를 돌려준다.

```ts
export const useFetchProductDetail = (productId?: number) => {
  const isValidProductId =
    typeof productId === 'number' && Number.isFinite(productId);

  return useApiQuery(
    '/api/v1/products/{productId}',
    { params: { path: { productId: productId ?? 0 } } },
    { enabled: isValidProductId }
  );
};
```

**무한 스크롤** — `useApiInfiniteQuery`. init에 page를 넣지 않는다(훅이 붙인다).
기본은 `hasNext`면 다음 page. 응답에 page 인덱스가 없으면 `getNextPageParam`을 넘긴다.
목록·전체 개수는 `flattenPages` / `getTotalCount`로 꺼낸다.

```ts
useApiInfiniteQuery(
  '/api/v1/products/{productId}/reviews',
  { params: { path: { productId }, query: { size } } },
  {
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasNext ? allPages.length : undefined,
  }
);
```

**변경** — `useMutation` + `fetchClient.{METHOD}` + `unwrapApiData`.
`mutate`를 그대로 노출하지 말고 **도메인 언어로 재포장**한다.

```ts
export const useProductWish = () => {
  const queryClient = useQueryClient();
  const guardAction = useAuthGuard(); // 로그인 필요한 동작
  const showSnackbar = useSnackbarStore((s) => s.showSnackbar);

  const { mutate } = useMutation({
    scope: { id: 'product-wish' }, // 연타 시 요청 직렬화
    mutationFn: ({ productId, isWished }: ToggleProductWishParams) =>
      unwrapApiData(
        fetchClient.PATCH('/api/v1/products/{productId}/wish', {
          params: { path: { productId } },
          body: { wishStatus: isWished ? 'NONE' : 'LIKE' },
        })
      ),
    onMutate: async ({ productId, isWished }) => {
      await cancelProductWishQueries(queryClient);
      setProductWishInCaches(queryClient, productId, !isWished);
    },
    onError: (_e, { productId, isWished }) => {
      setProductWishInCaches(queryClient, productId, isWished);
      showSnackbar('상품 찜 상태를 변경하지 못했어요.', { variant: 'error' });
    },
    onSuccess: ({ productId, wishStatus }) =>
      setProductWishInCaches(queryClient, productId, wishStatus === 'LIKE'),
  });

  return { toggleWish: guardAction((params) => mutate(params)) };
};
```

체크할 것:

- 로그인이 필요하면 `useAuthGuard`로 감싼다.
- 같은 리소스를 연타할 수 있으면 `scope: { id }`로 직렬화한다.
- 성공 후 다른 쿼리를 갱신하려면 `apiKey(경로, params?)` / `isUnderResource(...)`로 가리킨다. 키 문자열을 손으로 쓰지 않는다.
- 여러 쿼리에 걸친 낙관적 갱신은 훅에 흩지 말고 `packages/shared/src/query/{도메인}Cache.ts`로 뺀다.
- **무한 스크롤 쿼리는 `invalidateQueries` 대신 국소 패치**한다 (페이지 경계가 흔들린다).
- 화면 값과 서버 값이 다르면 훅 안에 상수 표로 바꾼다 (`USER_PRODUCT_STATUS_TO_REQUEST`).
- 성공/실패 안내는 스낵바로. 톤 — 성공 `"~했어요."` / 실패 `"~하지 못했어요. 잠시 후 다시 시도해 주세요."`

## 6. 에러 처리

전역 `throwOnError`가 true라 기본은 에러 바운더리로 던진다.
조회 실패를 **화면 안에서 안내할 수 있으면** `throwOnError: false`를 두고 섹션에서 처리한다.
그 화면의 존재 이유인 데이터(상품 상세의 상품 정보 등)만 바운더리로 던진다.
에러 타입은 `ApiQueryError`(서버 에러 본문 `ApiErrorResponse` 또는 네트워크·타임아웃 `Error`)다.

## 7. 마무리 체크

- [ ] `api:sync`로 스냅샷·생성 타입을 갱신했고 diff를 확인했는가
- [ ] 경로·응답 타입을 손으로 쓰지 않았는가 (엔드포인트 상수·DTO·매퍼·키 상수 없음)
- [ ] **필드명이 서버와 같은가**
- [ ] nullable 필드를 `!`·`as` 없이 처리했는가 (`packages/shared/CLAUDE.md` §nullable)
- [ ] 변환이 있다면 `select`나 훅 안 상수 표에 있는가
- [ ] 무효화·캐시 갱신이 `apiKey()`/`isUnderResource()`를 쓰는가
- [ ] 상품 카드를 담는 쿼리라면 `WISH_QUERY_PREFIXES`에 추가했는가
- [ ] 별칭·훅을 barrel에 등록했는가
- [ ] `pnpm type-check` 통과 (못 돌렸으면 이유를 말한다)
