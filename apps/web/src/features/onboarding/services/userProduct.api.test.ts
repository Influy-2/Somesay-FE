import {
  apiClient,
  configureApiClient,
  postUserProduct,
  type UserProductRequestType,
  type UserProductResponseType,
} from '@somesay/shared';
import type { AxiosAdapter } from 'axios';
import { afterEach, describe, expect, it, vi } from 'vitest';

const request: UserProductRequestType = {
  status: 'MISMATCHED',
  productIds: [1, 2],
};

const response: UserProductResponseType = {
  status: 'MISMATCHED',
  details: [
    {
      productId: 1,
      brandName: '브랜드',
      productName: '상품',
      productImgUrl: 'https://example.com/product.jpg',
    },
  ],
};

const responseDto = {
  ...response,
  status: 'UNMATCHED' as const,
};

describe('user product API', () => {
  afterEach(() => vi.restoreAllMocks());

  it('프론트엔드 상태를 DTO 상태로 변환해 저장한다', async () => {
    const post = vi.spyOn(apiClient, 'post').mockResolvedValue({
      data: { code: 'SUCCESS', message: '', data: responseDto },
    });

    await expect(postUserProduct(request)).resolves.toEqual(response);
    expect(post).toHaveBeenCalledWith('/users/product', {
      status: 'UNMATCHED',
      productIds: request.productIds,
    });
  });

  it('저장된 JWT를 Authorization 헤더에 포함한다', async () => {
    configureApiClient({
      baseURL: 'https://api.example.com',
      getAccessToken: () => 'jwt-access-token',
    });

    const adapter: AxiosAdapter = vi.fn(async (config) => ({
      data: { code: 'SUCCESS', message: '', data: responseDto },
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    }));
    const originalAdapter = apiClient.defaults.adapter;
    apiClient.defaults.adapter = adapter;

    try {
      await postUserProduct(request);
    } finally {
      if (originalAdapter === undefined) {
        delete apiClient.defaults.adapter;
      } else {
        apiClient.defaults.adapter = originalAdapter;
      }
      apiClient.interceptors.request.clear();
    }

    expect(adapter).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer jwt-access-token',
        }),
      })
    );
  });
});
