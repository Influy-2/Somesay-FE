---
name: api-integration
description: 백엔드 API 명세를 받아 Somesay 프론트엔드에 연동할 때 사용한다. 엔드포인트·DTO·프론트 타입·매퍼·쿼리키·React Query 훅을 규약대로 만든다. "이 API 붙여줘", "이 응답으로 훅 만들어줘", 스웨거/DTO를 붙여넣은 요청에 해당한다.
---

# API 연동 워크플로우

네이밍·파일 배치 규칙은 `packages/shared/CLAUDE.md`에 있다. 이 문서는 **순서와 판단 기준**만 다룬다.

## 1. 입력 확인 — 없으면 먼저 묻는다

필수: 엔드포인트 · HTTP 메서드 · 응답 DTO · 이 API가 무엇을 하는지
선택: path/query 파라미터 · 요청 바디 · 페이지네이션 여부 · 어느 화면에서 쓰는지

**DTO 필드 이름이나 옵셔널 여부가 불확실하면 추측하지 말고 묻는다.** 잘못된 DTO는 런타임까지 안 잡힌다.

## 2. 계획 제시 → 승인 대기

코드를 쓰기 전에 한국어로 제시한다.

```
## 구현 계획
- 변경 파일: (경로 목록)
- 함수/훅 이름: fetchX / useFetchX
- 매퍼 필요 여부: 필요하면 **3가지 사유 중 무엇인지** 밝힌다. 이름만 다르면 매퍼를 만들지 않는다
- 서버 이름 중 나쁜 것: (있으면 백엔드에 수정 요청할 목록으로 짚는다)
- 쿼리키: QUERY_KEYS.X.Y(...)
- React Query 옵션: (아래 기준에 따른 추천 + 이유)
- 확인 필요: (불명확한 점)
```

승인 전에 파일을 만들지 않는다.

## 3. 구현 순서

1. `constants/endpoints.ts` — 도메인 중첩 + 한 줄 주석
2. `domain/{도메인}/{도메인}.types.ts` — **서버 필드명을 그대로** 쓴다
3. `domain/{도메인}/{도메인}.mapper.ts` — 표현 변환·래핑 벗기기·구조 변경 **3가지 경우에만**
4. `domain/{도메인}/{도메인}.dto.ts` — **매퍼가 있을 때만** 만든다
5. `api/{도메인}/{함수명}.api.ts` — `response.data.data` 언래핑
6. `query/queryKeys.ts` — 파라미터가 있으면 `_ALL()` 짝을 함께
7. `apps/web/src/shared/hooks/{도메인}/use{X}.ts`
8. barrel 등록 — `packages/shared/src/index.ts`, `shared/hooks/index.ts`
9. `pnpm type-check`

## 4. React Query 옵션 판단

전역 기본값이 `App.tsx`에 있다 (`staleTime` 5분, `gcTime` 30분, `retry` 1).
**전역과 같은 값을 다시 쓰지 않는다.** 다를 때만 쓰고 이유를 주석으로 남긴다.

| 옵션           | 언제                                                   |
| -------------- | ------------------------------------------------------ |
| `staleTime` ↑  | 카테고리·브랜드 정보처럼 거의 안 변하는 데이터         |
| `staleTime` ↓  | 랭킹·찜처럼 자주 바뀌거나 mutation 영향을 받는 데이터  |
| `enabled`      | path 파라미터가 없거나 유효하지 않을 때                |
| `retry: false` | 실패를 즉시 사용자에게 알려야 하는 요청 (로그인, 저장) |
| `select`       | 컴포넌트가 응답의 일부만 쓸 때                         |

`useQuery`(단건) / `useInfiniteQuery`(페이지네이션) / `useMutation`(POST·PATCH·PUT·DELETE).
쿼리키에는 **응답 내용을 바꾸는 값을 전부** 넣는다. 페이지 번호는 제외한다.

## 5. 훅 작성 패턴

**조회 훅** — 쿼리 객체를 그대로 반환한다.

```ts
export const useFetchProductDetail = (productId?: number) => {
  const isValid = typeof productId === 'number' && Number.isFinite(productId);

  return useQuery({
    queryKey: QUERY_KEYS.PRODUCT.DETAIL(productId),
    queryFn: () => fetchProductDetail(productId ?? 0),
    enabled: isValid,
  });
};
```

**변경 훅** — `mutate`를 그대로 노출하지 말고 **도메인 언어로 재포장**한다.

```ts
export const useProductWish = () => {
  const queryClient = useQueryClient();
  const guardAction = useAuthGuard(); // 로그인 필요한 동작
  const showSnackbar = useSnackbarStore((s) => s.showSnackbar);

  const { mutate } = useMutation({
    scope: { id: 'product-wish' }, // 연타 시 요청 직렬화
    mutationFn: ({ productId, isHearted }) =>
      patchProductWish(productId, isHearted ? 'NONE' : 'LIKE'),
    onMutate: async ({ productId, isHearted }) => {
      await cancelProductWishQueries(queryClient);
      setProductWishInCaches(queryClient, productId, !isHearted);
    },
    onError: (_e, { productId, isHearted }) => {
      setProductWishInCaches(queryClient, productId, isHearted);
      showSnackbar('상품 찜 상태를 변경하지 못했어요.', { variant: 'error' });
    },
    onSuccess: ({ productId, isHearted }) =>
      setProductWishInCaches(queryClient, productId, isHearted),
  });

  return { toggleWish: guardAction((params) => mutate(params)) };
};
```

체크할 것:

- 로그인이 필요하면 `useAuthGuard`로 감싼다.
- 같은 리소스를 연타할 수 있으면 `scope: { id }`로 직렬화한다.
- 여러 쿼리에 걸친 낙관적 갱신은 훅에 흩지 말고 `query/{도메인}Cache.ts`로 뺀다.
- **무한 스크롤 쿼리는 `invalidateQueries` 대신 국소 패치**한다 (페이지 경계가 흔들린다).
- 성공/실패 안내는 스낵바로. 톤 — 성공 `"~했어요."` / 실패 `"~하지 못했어요. 잠시 후 다시 시도해 주세요."`

## 6. 에러 처리

조회 실패를 **화면 안에서 안내할 수 있으면** `throwOnError: false`를 두고 섹션에서 처리한다.
그 화면의 존재 이유인 데이터(상품 상세의 상품 정보 등)만 에러 바운더리로 던진다.

## 7. 마무리 체크

- [ ] 엔드포인트가 `API_ENDPOINTS`에 있고 `buildPath`로만 치환되는가
- [ ] **필드명이 서버와 같은가** (이름만 바꾸는 매퍼를 만들지 않았는가)
- [ ] 매퍼를 만들었다면 3가지 사유 중 하나에 해당하는가
- [ ] api 함수가 `response.data.data`를 벗겨 반환하는가
- [ ] 변환 로직이 api 파일이 아니라 매퍼에 있는가
- [ ] 쿼리키에 응답을 바꾸는 값이 전부 들어갔는가
- [ ] 파라미터가 있는 키에 `_ALL()` 짝이 있는가
- [ ] 상품 카드를 담는 쿼리라면 `WISH_QUERY_PREFIXES`에 추가했는가
- [ ] barrel에 등록했는가
- [ ] `pnpm type-check` 통과 (못 돌렸으면 이유를 말한다)
