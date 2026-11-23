import type { CreatorRankingResponse } from '@somesay/shared';

import { useApiQuery } from '@/shared/api';
import { withRankChange } from '../ranking/creatorRankChange';

// select 참조를 고정해 렌더마다 다시 계산하지 않습니다.
const selectRankChange = (creators: CreatorRankingResponse[]) =>
  creators.map(withRankChange);

// 홈 크리에이터 신뢰도 랭킹(상위 5명)을 조회하는 React Query hook입니다.
export const useFetchHomeCreatorRanking = () =>
  useApiQuery('/api/v1/home/creators', undefined, {
    select: selectRankChange,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });
