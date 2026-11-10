import { useApiQuery } from '@/shared/api';

// 선택한 피부 타입에 맞는 홈 고평점 리뷰를 조회하는 hook입니다.
export const useFetchHomeCuration = (
  selectedSkinTypeId?: number,
  enabled = true
) =>
  useApiQuery(
    '/api/v1/home/curation',
    {
      params: {
        query: selectedSkinTypeId === undefined ? {} : { selectedSkinTypeId },
      },
    },
    { enabled }
  );
