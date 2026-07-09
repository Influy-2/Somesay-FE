import { fetchBrandDetail, QUERY_KEYS } from '@somesay/shared';
import { useQuery } from '@tanstack/react-query';

const BRAND_DETAIL_STALE_TIME = 1000 * 60 * 5;

// 브랜드 홈 상단에 표시할 브랜드 상세 정보를 조회합니다.
export const useFetchBrandDetail = (brandId?: number) => {
  const isValidBrandId =
    typeof brandId === 'number' && Number.isInteger(brandId) && brandId > 0;

  const query = useQuery({
    queryKey: isValidBrandId
      ? QUERY_KEYS.BRAND.DETAIL(brandId)
      : [...QUERY_KEYS.BRAND.ALL, 'detail', brandId],
    queryFn: () => fetchBrandDetail(brandId ?? 0),
    enabled: isValidBrandId,
    staleTime: BRAND_DETAIL_STALE_TIME,
  });

  return query;
};
