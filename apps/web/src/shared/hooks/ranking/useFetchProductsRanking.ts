import { useApiInfiniteQuery } from '@/shared/api';

interface UseFetchProductsRankingOptions {
  size?: number;
  mainCategoryId?: number;
}

// 상품 랭킹을 카테고리별 페이지 단위로 조회하는 React Query hook입니다.
export const useFetchProductsRanking = ({
  size = 10,
  mainCategoryId,
}: UseFetchProductsRankingOptions = {}) =>
  useApiInfiniteQuery(
    '/api/v1/rankings/products',
    {
      params: {
        query:
          mainCategoryId === undefined ? { size } : { size, mainCategoryId },
      },
    },
    {
      // 전역 기본값과 달리 섹션 내부에서 재시도 UI를 직접 보여주므로 에러를 던지지 않습니다.
      throwOnError: false,
    }
  );
