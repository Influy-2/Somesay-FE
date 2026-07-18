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
  ageGroup: string; //TODO: enum으로 교체
  skinTypes: string[];
  subscriberNum: number;
  trustScore: number;
}
