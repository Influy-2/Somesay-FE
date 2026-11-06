import { QueryClient } from '@tanstack/react-query';
import { describe, expect, it } from 'vitest';

import { QUERY_KEYS, setProductWishInCaches } from '@somesay/shared';

import { apiKey } from '@/shared/api';

const createProduct = (productId: number, isWished: boolean) => ({
  productId,
  productName: `상품 ${productId}`,
  isWished,
});

// 캐시에는 응답 래퍼째 저장됩니다.
const wrap = <TData>(data: TData) => ({ code: 'OK', message: 'OK', data });

const homeRankingKey = apiKey('/api/v1/home/products/best');

describe('setProductWishInCaches', () => {
  it('배열로 저장된 캐시의 찜 상태를 갱신한다', () => {
    const queryClient = new QueryClient();
    queryClient.setQueryData(
      homeRankingKey,
      wrap([createProduct(1, false), createProduct(2, false)])
    );

    setProductWishInCaches(queryClient, 1, true);

    expect(queryClient.getQueryData(homeRankingKey)).toEqual(
      wrap([createProduct(1, true), createProduct(2, false)])
    );
  });

  it('무한 스크롤 캐시의 페이지마다 찜 상태를 갱신한다', () => {
    const queryClient = new QueryClient();
    const rankingKey = apiKey('/api/v1/rankings/products', {
      query: { size: 10 },
    });
    const categoryKey = apiKey('/api/v1/products', {
      query: { mainCategoryId: 1 },
    });

    queryClient.setQueryData(rankingKey, {
      pageParams: [0, 1],
      pages: [
        wrap({ content: [createProduct(1, false)], hasNext: true }),
        wrap({ content: [createProduct(2, false)], hasNext: false }),
      ],
    });
    queryClient.setQueryData(categoryKey, {
      pageParams: [0],
      pages: [wrap({ content: [createProduct(2, false)], hasNext: false })],
    });

    setProductWishInCaches(queryClient, 2, true);

    expect(queryClient.getQueryData(rankingKey)).toMatchObject({
      pageParams: [0, 1],
      pages: [
        { data: { content: [createProduct(1, false)] } },
        { data: { content: [createProduct(2, true)] } },
      ],
    });
    expect(queryClient.getQueryData(categoryKey)).toMatchObject({
      pages: [{ data: { content: [createProduct(2, true)] } }],
    });
  });

  it('단일 객체로 저장된 상세 캐시를 갱신한다', () => {
    const queryClient = new QueryClient();
    const detailKey = apiKey('/api/v1/products/{productId}', {
      path: { productId: 1 },
    });
    queryClient.setQueryData(detailKey, wrap(createProduct(1, true)));

    setProductWishInCaches(queryClient, 1, false);

    expect(queryClient.getQueryData(detailKey)).toEqual(
      wrap(createProduct(1, false))
    );
  });

  it('브랜드 상품 목록처럼 path 파라미터가 있는 목록도 갱신한다', () => {
    const queryClient = new QueryClient();
    const brandKey = apiKey('/api/v1/brands/{brandId}/products', {
      path: { brandId: 7 },
      query: { size: 10 },
    });
    queryClient.setQueryData(brandKey, {
      pageParams: [0],
      pages: [wrap({ content: [createProduct(3, false)], hasNext: false })],
    });

    setProductWishInCaches(queryClient, 3, true);

    expect(queryClient.getQueryData(brandKey)).toMatchObject({
      pages: [{ data: { content: [createProduct(3, true)] } }],
    });
  });

  it('바뀐 항목이 없으면 원본 참조를 유지한다', () => {
    const queryClient = new QueryClient();
    const body = wrap([createProduct(1, false), createProduct(2, false)]);
    queryClient.setQueryData(homeRankingKey, body);

    setProductWishInCaches(queryClient, 999, true);

    expect(queryClient.getQueryData(homeRankingKey)).toBe(body);
  });

  it('바뀐 항목만 새 참조가 되고 나머지 항목은 참조를 유지한다', () => {
    const queryClient = new QueryClient();
    const body = wrap([createProduct(1, false), createProduct(2, false)]);
    queryClient.setQueryData(homeRankingKey, body);

    setProductWishInCaches(queryClient, 1, true);

    const next = queryClient.getQueryData<typeof body>(homeRankingKey);
    expect(next?.data[0]).not.toBe(body.data[0]);
    expect(next?.data[1]).toBe(body.data[1]);
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

  it('찜 목록에 없는 경로의 캐시는 같은 상품이어도 건드리지 않는다', () => {
    const queryClient = new QueryClient();
    const curationKey = apiKey('/api/v1/home/curation');
    const body = wrap([createProduct(1, false)]);
    queryClient.setQueryData(curationKey, body);

    setProductWishInCaches(queryClient, 1, true);

    expect(queryClient.getQueryData(curationKey)).toBe(body);
  });
});
