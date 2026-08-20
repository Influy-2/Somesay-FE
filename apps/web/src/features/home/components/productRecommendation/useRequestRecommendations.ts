import {
  buildRecommendationParams,
  fetchHomeRecommendations,
  QUERY_KEYS,
  type RecommendedProductType,
  type SelectedFiltersType,
} from '@somesay/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { PATH } from '@/routes/path';
import { useSnackbarStore } from '@/shared/stores';

import { useRecommendationFilterStore } from '../../stores/recommendationFilter.store';

/**
 * 고른 조건으로 추천 상품을 먼저 조회하고, 응답이 온 뒤 추천 화면으로 이동합니다.
 *
 * 결과가 없거나 요청이 실패한 채로 화면을 넘기면 빈 화면만 보이므로 홈에서 먼저 확인합니다.
 * 응답은 쿼리 캐시에 채워 두어 추천 화면이 같은 조건으로 다시 요청하지 않습니다.
 */
export const useRequestRecommendations = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
  const setRecommendationFilters = useRecommendationFilterStore(
    (state) => state.setFilters
  );

  const { mutate, isPending } = useMutation<
    RecommendedProductType[],
    Error,
    SelectedFiltersType
  >({
    mutationFn: async (filters) => {
      const params = buildRecommendationParams(filters);
      const products = await fetchHomeRecommendations(params);

      // 추천 화면이 같은 조건으로 다시 요청하지 않도록 응답을 캐시에 채워 둡니다.
      queryClient.setQueryData(QUERY_KEYS.HOME.RECOMMEND(params), products);

      return products;
    },
    onSuccess: (products, filters) => {
      if (products.length === 0) {
        showSnackbar('조건에 맞는 제품을 찾지 못했어요. 조건을 바꿔보세요.');
        return;
      }

      setRecommendationFilters(filters);
      navigate(`/${PATH.HOME.PRODUCT_RECOMMENDATIONS}`);
    },
    onError: () => {
      showSnackbar(
        '추천 제품을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.',
        {
          variant: 'error',
        }
      );
    },
  });

  return { requestRecommendations: mutate, isRequesting: isPending };
};
