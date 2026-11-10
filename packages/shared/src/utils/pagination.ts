/**
 * 무한 스크롤(useInfiniteQuery) 응답을 다루는 헬퍼입니다.
 *
 * 백엔드 페이지 응답은 현재 4가지 형식이 섞여 있습니다.
 * - SliceResponse:        content, pageNumber, pageSize, hasNext
 * - CountedSliceResponse: SliceResponse + totalCount (첫 페이지에만 값, 이후 null)
 * - CursorResponse:       content, totalCount, nextCursor, hasNext
 * - PageResponse:         content, totalElements, totalPages, hasNext
 *
 * 컴포넌트가 형식 차이를 몰라도 되도록, 목록과 전체 개수를 꺼내는 방법을 여기 한 곳에 모아 둡니다.
 * 백엔드가 형식을 통일하면 이 파일만 고치면 됩니다.
 */

/** 모든 페이지 응답이 공통으로 갖는 형태 */
interface ContentPage<TItem> {
  content: TItem[];
}

/** 전체 개수를 담을 수 있는 페이지 응답 형태 (형식별 필드명이 달라 둘 다 받습니다) */
interface CountablePage {
  totalCount?: number | null;
  totalElements?: number | null;
}

/**
 * 무한 쿼리의 모든 페이지를 하나의 배열로 합칩니다.
 *
 * - 데이터가 아직 없으면(로딩 중) 빈 배열을 돌려줍니다.
 * - 예: `flattenPages(query.data)` → `[상품1, 상품2, ...]`
 *
 * @param data useInfiniteQuery 의 `data` (InfiniteData)
 */
export const flattenPages = <TItem>(
  data: { pages: ContentPage<TItem>[] } | undefined
): TItem[] => data?.pages.flatMap((page) => page.content) ?? [];

/**
 * 무한 쿼리의 전체 개수를 꺼냅니다.
 *
 * - 첫 페이지 기준으로 읽습니다. (CountedSliceResponse 는 2페이지부터 totalCount 가 null 이기 때문)
 * - `totalCount`(Slice·Cursor 형식)와 `totalElements`(Page 형식)를 모두 지원합니다.
 * - 데이터가 없거나 개수를 알 수 없으면 0 을 돌려줍니다.
 *
 * @param data useInfiniteQuery 의 `data` (InfiniteData)
 */
export const getTotalCount = (
  data: { pages: CountablePage[] } | undefined
): number => {
  const firstPage = data?.pages[0];
  return firstPage?.totalCount ?? firstPage?.totalElements ?? 0;
};
