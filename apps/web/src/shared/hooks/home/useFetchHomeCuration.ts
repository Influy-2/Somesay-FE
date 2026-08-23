import { fetchHomeCuration, QUERY_KEYS } from '@somesay/shared';
import { useQuery } from '@tanstack/react-query';

// 선택한 피부 타입에 맞는 홈 고평점 리뷰를 조회하는 hook입니다.
export const useFetchHomeCuration = (
  selectedSkinTypeId?: number,
  enabled = true
) => {
  return useQuery({
    queryKey: QUERY_KEYS.HOME.CURATION(selectedSkinTypeId),
    queryFn: () => fetchHomeCuration(selectedSkinTypeId),
    enabled,
  });
};
