import {
  apiClient,
  postUserProduct,
  type UserProductRequestType,
  type UserProductResponseType,
} from '@somesay/shared';
import { afterEach, describe, expect, it, vi } from 'vitest';

const request: UserProductRequestType = {
  status: 'MATCHED',
  productIds: [1, 2],
};

const response: UserProductResponseType = {
  status: 'MATCHED',
  details: [
    {
      productId: 1,
      brandName: '브랜드',
      productName: '상품',
      productImgUrl: 'https://example.com/product.jpg',
    },
  ],
};

describe('user product API', () => {
  afterEach(() => vi.restoreAllMocks());

  it('사용자에게 맞는 상품 목록을 저장하고 응답 데이터를 반환한다', async () => {
    const post = vi.spyOn(apiClient, 'post').mockResolvedValue({
      data: { code: 'SUCCESS', message: '', data: response },
    });

    await expect(postUserProduct(request)).resolves.toEqual(response);
    expect(post).toHaveBeenCalledWith('/users/product', request);
  });
});
