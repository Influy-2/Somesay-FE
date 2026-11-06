import type {
  InfiniteData,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import type { MaybeOptionalInit } from 'openapi-fetch';
import type { ApiGetPath, paths } from '@somesay/shared';

import { $api } from './client';
import type { ApiData, ApiQueryError } from './useApiQuery';

type ApiGetInit<Path extends ApiGetPath> = MaybeOptionalInit<
  paths[Path],
  'get'
>;

// 이 서버의 페이지네이션은 0부터 시작하는 page 인덱스입니다.
type PageParam = number;

// 화면이 받는 모양입니다. pages 는 래퍼를 벗긴 페이지(data) 목록입니다.
export type ApiInfiniteData<Path extends ApiGetPath> = InfiniteData<
  ApiData<Path>,
  PageParam
>;

type ApiInfiniteQueryOptions<Path extends ApiGetPath> = Omit<
  UseInfiniteQueryOptions<
    unknown,
    ApiQueryError,
    ApiInfiniteData<Path>,
    readonly unknown[],
    PageParam
  >,
  | 'queryKey'
  | 'queryFn'
  | 'select'
  | 'initialPageParam'
  | 'getNextPageParam'
  | 'getPreviousPageParam'
> & {
  /** 쿼리 파라미터 이름입니다. 기본값 'page' */
  pageParamName?: string;
  /** 첫 페이지 인덱스입니다. 기본값 0 */
  initialPageParam?: PageParam;
  /**
   * 래퍼를 벗긴 페이지를 받아 다음 page 를 돌려줍니다. 없으면 undefined.
   * 생략하면 `lastPage.hasNext` 가 true 일 때 `lastPageParam + 1` 입니다.
   */
  getNextPageParam?: (
    lastPage: ApiData<Path>,
    allPages: ApiData<Path>[],
    lastPageParam: PageParam
  ) => PageParam | undefined;
};

// path 파라미터·필수 쿼리가 있는 경로만 init 을 필수로 받습니다.
type ApiInfiniteQueryArgs<Path extends ApiGetPath> =
  undefined extends ApiGetInit<Path>
    ? [init?: ApiGetInit<Path>, options?: ApiInfiniteQueryOptions<Path>]
    : [init: ApiGetInit<Path>, options?: ApiInfiniteQueryOptions<Path>];

const hasNextPage = (page: unknown) =>
  typeof page === 'object' &&
  page !== null &&
  (page as { hasNext?: unknown }).hasNext === true;

const unwrap = (body: unknown) => (body as { data: unknown }).data;

/**
 * page 인덱스 방식 무한 스크롤 GET 훅입니다. `useApiQuery` 와 같은 철학입니다.
 *
 * - 경로·init 은 스펙에서 추론됩니다. init 에 page 는 넣지 않습니다(훅이 `pageParamName` 으로 붙입니다).
 * - 쿼리 키는 `$api.useInfiniteQuery` 와 같은 ['get', 경로, init] 입니다. 무효화는 `apiKey()` 로 가리킵니다.
 *   같은 경로·init 을 일반 쿼리(useApiQuery)로도 쓰면 키가 겹치므로 한 경로는 한 방식으로만 씁니다.
 * - 캐시에는 페이지마다 응답 래퍼째 저장되고, 화면은 `data.pages` 로 래퍼를 벗긴 페이지를 받습니다.
 * @example
 * const { data, hasNextPage, fetchNextPage } = useApiInfiniteQuery('/api/v1/rankings/products', {
 *   params: { query: { size: 10 } },
 * });
 * // data.pages: SliceResponseProductPreviewCard[]
 */
export const useApiInfiniteQuery = <Path extends ApiGetPath>(
  path: Path,
  ...[init, options]: ApiInfiniteQueryArgs<Path>
): UseInfiniteQueryResult<ApiInfiniteData<Path>, ApiQueryError> => {
  const {
    pageParamName = 'page',
    initialPageParam = 0,
    getNextPageParam,
    ...restOptions
  } = options ?? {};

  // openapi-react-query 의 경로별 제네릭은 TS 가 이 함수 안에서 풀지 못해 느슨하게 부릅니다.
  // 바깥 타입 보장(경로·init·반환 pages)은 위 시그니처가 맡습니다.
  return ($api.useInfiniteQuery as unknown as LooseUseInfiniteQuery)(
    'get',
    path,
    init,
    {
      ...restOptions,
      pageParamName,
      initialPageParam,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        const lastData = unwrap(lastPage);

        if (getNextPageParam) {
          return getNextPageParam(
            lastData as ApiData<Path>,
            allPages.map(unwrap) as ApiData<Path>[],
            lastPageParam
          );
        }

        return hasNextPage(lastData) ? lastPageParam + 1 : undefined;
      },
      select: (data) => ({
        pages: data.pages.map(unwrap),
        pageParams: data.pageParams,
      }),
    }
  ) as UseInfiniteQueryResult<ApiInfiniteData<Path>, ApiQueryError>;
};

type LooseUseInfiniteQuery = (
  method: 'get',
  path: ApiGetPath,
  init: unknown,
  options: Omit<
    UseInfiniteQueryOptions<
      unknown,
      ApiQueryError,
      InfiniteData<unknown, PageParam>,
      readonly unknown[],
      PageParam
    >,
    'queryKey' | 'queryFn'
  > & { pageParamName: string }
) => UseInfiniteQueryResult<InfiniteData<unknown, PageParam>, ApiQueryError>;
