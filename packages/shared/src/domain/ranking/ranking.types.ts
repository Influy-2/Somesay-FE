import type { CreatorRankingUpDownType } from '../creator/creator.types';

// 홈 크리에이터 랭킹 화면에서 사용하는 문자열 연령대 타입입니다.
// `CreatorType.ageGroup`이 enum으로 바뀌면 이 화면만 문자열을 유지하기 위한 자리다.
// 지금은 Omit 후 같은 string이라 no-op이므로, 죽은 코드로 오해하지 말 것.
export interface HomeCreatorRankingType extends Omit<
  CreatorRankingUpDownType,
  'ageGroup'
> {
  ageGroup: string;
}
