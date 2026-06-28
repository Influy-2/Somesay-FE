import type { CreatorType } from './creator.types';

// 크리에이터 랭킹 리스트 조회 API의 응답으로 사용되는 DTO입니다.
export interface CreatorRankingDto extends Omit<CreatorType, 'personalColor'> {
  oldRanking: number;
}
