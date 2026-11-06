import {
  useQuery,
  type QueryFunction,
  type UseQueryOptions,
} from '@tanstack/react-query';
import type { MaybeOptionalInit } from 'openapi-fetch';
import type { MethodResponse } from 'openapi-react-query';
import type { ApiErrorResponse, ApiGetPath, paths } from '@somesay/shared';

import { $api } from './client';

type ApiGetInit<Path extends ApiGetPath> = MaybeOptionalInit<
  paths[Path],
  'get'
>;

// 200 응답 본문 전체입니다. 서버가 { code, message, data } 래퍼로 감싸 내려줍니다.
type ApiGetBody<Path extends ApiGetPath> = MethodResponse<
  typeof $api,
  'get',
  Path
>;

// 서버가 내려준 에러 본문({ code, message }) 또는 네트워크·타임아웃 에러입니다.
export type ApiQueryError = ApiErrorResponse | Error;

// 래퍼를 벗긴 실제 데이터입니다.
export type ApiData<Path extends ApiGetPath> =
  ApiGetBody<Path> extends { data: infer Data } ? Data : never;

type ApiQueryOptions<Path extends ApiGetPath, TSelected> = Omit<
  UseQueryOptions<ApiGetBody<Path>, ApiQueryError, TSelected>,
  'queryKey' | 'queryFn' | 'select'
> & {
  // 래퍼를 벗긴 data 를 받아 한 번 더 가공할 때만 씁니다. (예: 순위 변동 계산)
  select?: (data: ApiData<Path>) => TSelected;
};

// path 파라미터처럼 필수 값이 있는 경로만 init 을 필수로 받습니다.
type ApiQueryArgs<Path extends ApiGetPath, TSelected> =
  undefined extends ApiGetInit<Path>
    ? [init?: ApiGetInit<Path>, options?: ApiQueryOptions<Path, TSelected>]
    : [init: ApiGetInit<Path>, options?: ApiQueryOptions<Path, TSelected>];

/**
 * GET 조회 훅입니다. `$api.useQuery('get', …)` 와 같지만 응답 래퍼({ code, message, data })를 벗겨
 * 화면이 `data` 를 바로 받습니다. 훅마다 `select: (res) => res.data` 를 반복하지 않으려고 둡니다.
 *
 * - 쿼리 키는 openapi-react-query 와 같습니다(['get', 경로, init]). 무효화는 `apiKey()` 로 가리킵니다.
 * - 캐시에는 래퍼째 저장됩니다. (select 는 읽을 때만 적용)
 * @example
 * const { data } = useApiQuery('/api/v1/categories', undefined, { staleTime: Infinity });
 * // data: MainCategoryResponse[]
 */
export const useApiQuery = <Path extends ApiGetPath, TSelected = ApiData<Path>>(
  path: Path,
  ...[init, options]: ApiQueryArgs<Path, TSelected>
) => {
  const { select, ...restOptions } = options ?? {};

  // openapi-react-query 의 경로별 제네릭은 TS 가 이 함수 안에서 풀지 못해 키·조회 함수만 느슨하게 받아옵니다.
  // 바깥 타입 보장(경로·init·반환 data)은 위 시그니처가 맡습니다.
  const { queryKey, queryFn } = (
    $api.queryOptions as unknown as LooseQueryOptions
  )('get', path, init);

  return useQuery<unknown, ApiQueryError, TSelected>({
    ...(restOptions as LooseRestOptions<TSelected>),
    queryKey,
    queryFn,
    select: (body) => {
      const data = (body as { data: ApiData<Path> }).data;
      return select ? select(data) : (data as TSelected);
    },
  });
};

type LooseQueryOptions = (
  method: 'get',
  path: ApiGetPath,
  init?: unknown
) => { queryKey: readonly unknown[]; queryFn: QueryFunction<unknown> };

type LooseRestOptions<TSelected> = Omit<
  UseQueryOptions<unknown, ApiQueryError, TSelected>,
  'queryKey' | 'queryFn' | 'select'
>;
