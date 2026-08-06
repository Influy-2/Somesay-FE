import { QueryClient } from '@tanstack/react-query';
import { describe, expect, it } from 'vitest';

import { QUERY_KEYS, setProductWishInCaches } from '@somesay/shared';

const createProduct = (productId: number, isHearted: boolean) => ({
  productId,
  productName: `상품 ${productId}`,
  isHearted,
});

describe('setProductWishInCaches', () => {
  it('배열로 저장된 캐시의 찜 상태를 갱신한다', () => {
    const queryClient = new QueryClient();
    queryClient.setQueryData(QUERY_KEYS.HOME.PRODUCT_RANKING(), [
      createProduct(1, false),
      createProduct(2, false),
    ]);

    setProductWishInCaches(queryClient, 1, true);

    expect(queryClient.getQueryData(QUERY_KEYS.HOME.PRODUCT_RANKING())).toEqual(
      [createProduct(1, true), createProduct(2, false)]
    );
  });

  it('무한 스크롤 캐시의 컨테이너 이름이 달라도 갱신한다', () => {
    const queryClient = new QueryClient();
    const rankingKey = QUERY_KEYS.RANKING.PRODUCTS({ size: 10 });
    const categoryKey = QUERY_KEYS.PRODUCT.BY_CATEGORY({ mainCategoryId: 1 });

    queryClient.setQueryData(rankingKey, {
      pageParams: [0, 1],
      pages: [
        { content: [createProduct(1, false)], hasNext: true },
        { content: [createProduct(2, false)], hasNext: false },
      ],
    });
    queryClient.setQueryData(categoryKey, {
      pageParams: [0],
      pages: [{ products: [createProduct(2, false)], hasNext: false }],
    });

    setProductWishInCaches(queryClient, 2, true);

    expect(queryClient.getQueryData(rankingKey)).toMatchObject({
      pageParams: [0, 1],
      pages: [
        { content: [createProduct(1, false)] },
        { content: [createProduct(2, true)] },
      ],
    });
    expect(queryClient.getQueryData(categoryKey)).toMatchObject({
      pages: [{ products: [createProduct(2, true)] }],
    });
  });

  it('단일 객체로 저장된 상세 캐시를 갱신한다', () => {
    const queryClient = new QueryClient();
    queryClient.setQueryData(
      QUERY_KEYS.PRODUCT.DETAIL(1),
      createProduct(1, true)
    );

    setProductWishInCaches(queryClient, 1, false);

    expect(queryClient.getQueryData(QUERY_KEYS.PRODUCT.DETAIL(1))).toEqual(
      createProduct(1, false)
    );
  });

  it('바뀐 항목이 없으면 원본 참조를 유지한다', () => {
    const queryClient = new QueryClient();
    const products = [createProduct(1, false), createProduct(2, false)];
    queryClient.setQueryData(QUERY_KEYS.HOME.PRODUCT_RANKING(), products);

    setProductWishInCaches(queryClient, 999, true);

    expect(queryClient.getQueryData(QUERY_KEYS.HOME.PRODUCT_RANKING())).toBe(
      products
    );
  });

  it('바뀐 항목만 새 참조가 되고 나머지 항목은 참조를 유지한다', () => {
    const queryClient = new QueryClient();
    const products = [createProduct(1, false), createProduct(2, false)];
    queryClient.setQueryData(QUERY_KEYS.HOME.PRODUCT_RANKING(), products);

    setProductWishInCaches(queryClient, 1, true);

    const next = queryClient.getQueryData<typeof products>(
      QUERY_KEYS.HOME.PRODUCT_RANKING()
    );
    expect(next?.[0]).not.toBe(products[0]);
    expect(next?.[1]).toBe(products[1]);
  });

  it('찜 상태가 없는 쿼리는 건드리지 않는다', () => {
    const queryClient = new QueryClient();
    const reviews = {
      pageParams: [0],
      pages: [{ content: [{ reviewId: 1, productId: 1, content: '좋아요' }] }],
    };
    queryClient.setQueryData(QUERY_KEYS.PRODUCT.REVIEWS(1), reviews);

    setProductWishInCaches(queryClient, 1, true);

    expect(queryClient.getQueryData(QUERY_KEYS.PRODUCT.REVIEWS(1))).toBe(
      reviews
    );
  });
});
