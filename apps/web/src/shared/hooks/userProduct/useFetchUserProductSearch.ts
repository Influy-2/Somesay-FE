import {
  fetchUserProductSearch,
  QUERY_KEYS,
  type FetchUserProductSearchParams,
} from '@somesay/shared';
import { useQuery } from '@tanstack/react-query';

// 잘 맞거나 맞지 않는 상품으로 추가할 상품을 검색합니다.
export const useFetchUserProductSearch = ({
  keyword,
  sortType,
  mainCategoryId,
}: FetchUserProductSearchParams) => {
  const params = {
    keyword: keyword.trim(),
    sortType,
    // 전체 카테고리는 파라미터를 보내지 않는 것으로 표현합니다.
    ...(typeof mainCategoryId === 'number' ? { mainCategoryId } : {}),
  };

  return useQuery({
    queryKey: QUERY_KEYS.USER_PRODUCT.SEARCH(params),
    queryFn: () => fetchUserProductSearch(params),
    // 서버가 keyword를 필수로 받아, 검색어가 없으면 요청하지 않습니다.
    enabled: params.keyword.length > 0,
    // 조회 실패를 화면 안에서 안내하므로 전역 throwOnError(true)를 끕니다.
    throwOnError: false,
  });
};
