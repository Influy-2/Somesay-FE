import { useApiInfiniteQuery, type ApiInfiniteData } from '@/shared/api';
import { withRankChange } from './creatorRankChange';

interface UseFetchCreatorRankingOptions {
  size?: number;
}

// select 참조를 고정해 렌더마다 다시 계산하지 않습니다.
const selectRankChange = ({
  pages,
  pageParams,
}: ApiInfiniteData<'/api/v1/rankings/creators'>) => ({
  pageParams,
  pages: pages.map((page) => ({
    ...page,
    content: page.content.map(withRankChange),
  })),
});

// 크리에이터 신뢰도 랭킹을 페이지 단위로 조회하는 React Query hook입니다.
export const useFetchCreatorRanking = ({
  size = 10,
}: UseFetchCreatorRankingOptions = {}) =>
  useApiInfiniteQuery(
    '/api/v1/rankings/creators',
    { params: { query: { size } } },
    {
      select: selectRankChange,
      // 전역 기본값과 달리 섹션 내부에서 재시도 UI를 직접 보여주므로 에러를 던지지 않습니다.
      throwOnError: false,
    }
  );
