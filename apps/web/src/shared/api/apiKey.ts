import type { Query } from '@tanstack/react-query';
import type { ApiGetPath } from '@somesay/shared';

/**
 * openapi-react-query 가 만드는 쿼리 키(['get', 경로, init])를 손으로 가리킬 때 씁니다.
 * 경로가 스펙의 GET 경로로 제한돼 오타가 컴파일 에러로 잡힙니다.
 *
 * TanStack Query 는 키 안의 객체도 부분 매칭하므로, params 의 일부만 넘겨도 됩니다.
 * @example
 * // 카테고리 목록 쿼리 전부
 * queryClient.invalidateQueries({ queryKey: apiKey('/api/v1/categories') });
 * // mainCategoryId 3 인 상품 목록만 (sortType 은 무관)
 * queryClient.invalidateQueries({
 *   queryKey: apiKey('/api/v1/products', { query: { mainCategoryId: 3 } }),
 * });
 */
export const apiKey = (path: ApiGetPath, params?: object) =>
  params === undefined
    ? (['get', path] as const)
    : (['get', path, { params }] as const);

interface ApiQueryKeyInit {
  params?: { path?: Record<string, unknown> };
}

/**
 * 한 리소스 밑의 모든 GET 쿼리를 고르는 predicate 입니다.
 * 자동 키는 경로가 서로 다른 문자열이라 prefix 하나로 묶이지 않으므로,
 * REST 경로의 계층(/products/{productId}/…)과 path 파라미터로 고릅니다.
 * @example
 * // 5번 상품의 상세·리뷰·리뷰 개요·비슷한 상품 쿼리 전부
 * queryClient.invalidateQueries({
 *   predicate: isUnderResource('/api/v1/products/{productId}', { productId: 5 }),
 * });
 */
export const isUnderResource =
  (pathPrefix: ApiGetPath, pathParams: Record<string, number | string>) =>
  ({ queryKey }: Query) => {
    const [method, path, init] = queryKey as readonly [
      unknown,
      unknown,
      ApiQueryKeyInit?,
    ];

    return (
      method === 'get' &&
      typeof path === 'string' &&
      path.startsWith(pathPrefix) &&
      Object.entries(pathParams).every(
        ([name, value]) => init?.params?.path?.[name] === value
      )
    );
  };
