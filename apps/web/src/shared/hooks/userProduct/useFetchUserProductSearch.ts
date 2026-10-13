import type { paths } from '@somesay/shared';

import { useApiQuery } from '@/shared/api';

type UserProductSearchQuery =
  paths['/api/v1/users/products/search']['get']['parameters']['query'];

// 잘 맞거나 맞지 않는 상품으로 추가할 상품을 검색합니다. data: UserProductSearchItemResponse[]
export const useFetchUserProductSearch = ({
  keyword,
  sortType,
  mainCategoryId,
}: UserProductSearchQuery) => {
  const trimmedKeyword = keyword.trim();

  return useApiQuery(
    '/api/v1/users/products/search',
    {
      params: {
        query: {
          keyword: trimmedKeyword,
          sortType,
          // 전체 카테고리는 파라미터를 보내지 않는 것으로 표현합니다.
          ...(typeof mainCategoryId === 'number' ? { mainCategoryId } : {}),
        },
      },
    },
    {
      // 서버가 keyword를 필수로 받아, 검색어가 없으면 요청하지 않습니다.
      enabled: trimmedKeyword.length > 0,
      // 조회 실패를 화면 안에서 안내하므로 전역 throwOnError(true)를 끕니다.
      throwOnError: false,
    }
  );
};
