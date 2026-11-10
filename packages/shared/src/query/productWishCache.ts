import type { QueryClient } from '@tanstack/react-query';

import type { ApiGetPath } from '../api/schema';

// web 의 `apiKey()` 와 같은 모양(['get', 경로])입니다. shared 는 web 을 import 할 수 없어 여기서 만듭니다.
const getQueryPrefix = (path: ApiGetPath) => ['get', path] as const;

/**
 * 상품 찜 상태(isWished)가 캐시에 실리는 GET 쿼리들의 prefix 목록입니다.
 *
 * 찜을 토글한 뒤 캐시를 갱신할 때 이 목록만 순회하면 됩니다.
 * 리뷰/큐레이션/크리에이터 랭킹처럼 찜과 무관한 쿼리는 건드리지 않습니다.
 *
 * 새로 쓰는 GET 이 상품 카드(ProductCard·ProductPreviewCard)나 상품 상세를 담는다면 여기에 경로를 추가하세요.
 * (누락되면 해당 화면만 갱신되지 않고, 다른 화면은 영향받지 않습니다)
 * 키의 경로는 문자열 하나라 하위 경로까지 묶이지 않으므로, 경로마다 따로 적습니다.
 */
export const WISH_QUERY_PREFIXES = [
  getQueryPrefix('/api/v1/home/products'),
  getQueryPrefix('/api/v1/home/products/best'),
  getQueryPrefix('/api/v1/rankings/products'),
  getQueryPrefix('/api/v1/products'),
  getQueryPrefix('/api/v1/products/{productId}'),
  getQueryPrefix('/api/v1/products/{productId}/similar'),
  getQueryPrefix('/api/v1/brands/{brandId}/products'),
  getQueryPrefix('/api/v1/brands/{brandId}/products/search'),
] as const;

interface WishNode {
  productId: number;
  isWished: boolean;
}

const isWishNode = (value: object): value is WishNode => {
  const record = value as Record<string, unknown>;

  return (
    typeof record.productId === 'number' && typeof record.isWished === 'boolean'
  );
};

/**
 * 캐시 트리에서 대상 상품의 찜 상태만 교체합니다.
 *
 * 쿼리마다 컨테이너 모양이 달라(`{ data: ProductCard[] }`, `pages[].data.content`,
 * 단일 상세 객체) 필드명 대신 `{ productId, isWished }` 라는 모양으로 노드를 찾습니다.
 * 캐시에는 응답 래퍼({ code, message, data })째 저장되지만 재귀 탐색이라 무관합니다.
 * 새 쿼리가 생겨도 이 함수는 그대로 동작합니다.
 *
 * 바뀐 가지가 없으면 원본 참조를 그대로 반환합니다.
 * (새 객체를 만들면 찜과 무관한 리스트까지 전부 리렌더됩니다)
 */
const patchWishNode = <TNode>(
  node: TNode,
  productId: number,
  isWished: boolean
): TNode => {
  if (Array.isArray(node)) {
    let hasChanged = false;
    const nextItems = node.map((item: unknown) => {
      const nextItem = patchWishNode(item, productId, isWished);

      if (nextItem !== item) {
        hasChanged = true;
      }

      return nextItem;
    });

    return hasChanged ? (nextItems as TNode) : node;
  }

  if (typeof node !== 'object' || node === null) {
    return node;
  }

  if (isWishNode(node)) {
    if (node.productId !== productId || node.isWished === isWished) {
      return node;
    }

    return { ...node, isWished } as TNode;
  }

  let hasChanged = false;
  const nextEntries: Record<string, unknown> = {};

  Object.entries(node).forEach(([key, value]) => {
    const nextValue = patchWishNode(value, productId, isWished);

    if (nextValue !== value) {
      hasChanged = true;
    }

    nextEntries[key] = nextValue;
  });

  return hasChanged ? (nextEntries as TNode) : node;
};

/**
 * 찜 상태가 실린 모든 캐시에 변경된 찜 상태를 반영합니다.
 *
 * 무한 스크롤 쿼리를 invalidate하면 캐시된 전 페이지가 순차 리페치되고
 * 페이지 경계가 흔들려 항목이 중복/누락될 수 있습니다.
 * 찜은 boolean 하나만 바뀌고 정렬/총개수에 영향이 없으므로 국소 패치만 합니다.
 */
export const setProductWishInCaches = (
  queryClient: QueryClient,
  productId: number,
  isWished: boolean
) => {
  WISH_QUERY_PREFIXES.forEach((queryKey) => {
    queryClient.setQueriesData({ queryKey }, (data: unknown) =>
      patchWishNode(data, productId, isWished)
    );
  });
};

/**
 * 찜 상태가 실린 쿼리들의 진행 중인 요청을 취소합니다.
 *
 * 낙관적 갱신 직전에 호출해, 이미 떠 있던 요청의 낡은 응답이
 * 갱신된 캐시를 덮어쓰지 않게 합니다.
 */
export const cancelProductWishQueries = async (queryClient: QueryClient) => {
  await Promise.all(
    WISH_QUERY_PREFIXES.map((queryKey) =>
      queryClient.cancelQueries({ queryKey })
    )
  );
};
