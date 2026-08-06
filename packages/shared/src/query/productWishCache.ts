import type { QueryClient } from '@tanstack/react-query';

import { WISH_QUERY_PREFIXES } from './queryKeys';

interface WishNode {
  productId: number;
  isHearted: boolean;
}

const isWishNode = (value: object): value is WishNode => {
  const record = value as Record<string, unknown>;

  return (
    typeof record.productId === 'number' &&
    typeof record.isHearted === 'boolean'
  );
};

/**
 * 캐시 트리에서 대상 상품의 찜 상태만 교체합니다.
 *
 * 쿼리마다 컨테이너 모양이 달라(`ProductCardType[]`, `pages[].content`,
 * `pages[].products`, 단일 상세 객체) 필드명 대신 `{ productId, isHearted }`
 * 라는 모양으로 노드를 찾습니다. 새 쿼리가 생겨도 이 함수는 그대로 동작합니다.
 *
 * 바뀐 가지가 없으면 원본 참조를 그대로 반환합니다.
 * (새 객체를 만들면 찜과 무관한 리스트까지 전부 리렌더됩니다)
 */
const patchWishNode = <TNode>(
  node: TNode,
  productId: number,
  isHearted: boolean
): TNode => {
  if (Array.isArray(node)) {
    let hasChanged = false;
    const nextItems = node.map((item: unknown) => {
      const nextItem = patchWishNode(item, productId, isHearted);

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
    if (node.productId !== productId || node.isHearted === isHearted) {
      return node;
    }

    return { ...node, isHearted } as TNode;
  }

  let hasChanged = false;
  const nextEntries: Record<string, unknown> = {};

  Object.entries(node).forEach(([key, value]) => {
    const nextValue = patchWishNode(value, productId, isHearted);

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
  isHearted: boolean
) => {
  WISH_QUERY_PREFIXES.forEach((queryKey) => {
    queryClient.setQueriesData({ queryKey }, (data: unknown) =>
      patchWishNode(data, productId, isHearted)
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
