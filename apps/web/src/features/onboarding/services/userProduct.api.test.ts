import type {
  UserProductItemResponse,
  UserProductRequestType,
} from '@somesay/shared';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { setupApiClient } from '@/app/setupApiClient';
import { postUserProduct } from '@/shared/hooks/userProduct/usePostUserProduct';
import { useAuthTokenStore } from '@/shared/stores';

const request: UserProductRequestType = {
  status: 'MISMATCHED',
  productIds: [1, 2],
};

const items: UserProductItemResponse[] = [
  {
    productId: 1,
    brandName: '브랜드',
    productName: '상품',
    productImgUrl: 'https://example.com/product.jpg',
  },
];

// openapi-fetch 는 전역 fetch 를 부르므로 fetch 를 가로채 요청을 확인하고 응답을 돌려줍니다.
const mockFetch = (body: unknown, status = 200) =>
  vi.spyOn(globalThis, 'fetch').mockImplementation(async () =>
    Response.json(body, {
      status,
      headers: { 'Content-Type': 'application/json' },
    })
  );

const getSentRequest = (fetchSpy: ReturnType<typeof mockFetch>) =>
  fetchSpy.mock.calls.at(0)?.[0] as Request;

describe('user product API', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    useAuthTokenStore.getState().clearTokens();
  });

  it('화면 상태 MISMATCHED 를 서버 상태 UNMATCHED 로 바꿔 저장한다', async () => {
    const fetchSpy = mockFetch({ code: 'SUCCESS', message: '', data: items });

    await expect(postUserProduct(request)).resolves.toEqual(items);

    const sent = getSentRequest(fetchSpy);
    expect(sent.method).toBe('POST');
    expect(new URL(sent.url).pathname).toBe('/api/v1/users/products');
    await expect(sent.json()).resolves.toEqual({
      userProductStatus: 'UNMATCHED',
      productIds: request.productIds,
    });
  });

  it('MATCHED 상태는 그대로 보낸다', async () => {
    const fetchSpy = mockFetch({ code: 'SUCCESS', message: '', data: items });

    await postUserProduct({ status: 'MATCHED', productIds: [3] });

    await expect(getSentRequest(fetchSpy).json()).resolves.toEqual({
      userProductStatus: 'MATCHED',
      productIds: [3],
    });
  });

  it('실패 응답이면 서버 에러 본문을 throw 한다', async () => {
    const errorBody = { code: 'INVALID_INPUT', message: '잘못된 요청' };
    mockFetch(errorBody, 400);

    await expect(postUserProduct(request)).rejects.toEqual(errorBody);
  });

  it('저장된 JWT를 Authorization 헤더에 포함한다', async () => {
    setupApiClient();
    useAuthTokenStore.getState().setTokens({
      accessToken: 'jwt-access-token',
      refreshToken: 'jwt-refresh-token',
    });
    const fetchSpy = mockFetch({ code: 'SUCCESS', message: '', data: items });

    await postUserProduct(request);

    expect(getSentRequest(fetchSpy).headers.get('Authorization')).toBe(
      'Bearer jwt-access-token'
    );
  });
});
