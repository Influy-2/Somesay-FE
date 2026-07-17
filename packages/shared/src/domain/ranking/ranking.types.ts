import type { CreatorRankingUpDownType } from '../creator/creator.types';

// 홈 크리에이터 랭킹 화면에서 사용하는 문자열 연령대 타입입니다.
export interface HomeCreatorRankingType extends Omit<
  CreatorRankingUpDownType,
  'ageGroup'
> {
  ageGroup: string;
}
