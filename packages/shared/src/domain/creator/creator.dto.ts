import type { AgeType } from '../user/user.types';

// 크리에이터 랭킹 리스트 조회 API의 응답으로 사용되는 DTO입니다.
export interface CreatorRankingDto extends BasicCreatorDto {
  youtubeLink: string;
  ranking: number;
  oldRanking: number;
}

export interface BasicCreatorDto {
  creatorId: number;
  creatorName: string;
  profileImgUrl: string;
  age: AgeType | null;
  skinTypeIds: number[];
  subscriberNum: number;
  trustScore: number;
}
