// 크리에이터 랭킹 리스트 조회 API의 응답으로 사용되는 DTO입니다.
export interface CreatorRankingDto {
  creatorId: number;
  creatorName: string;
  profileImgUrl: string;
  youtubeLink: string;
  trustScore: number;
  skinTypes: string[];
  subscriberNum: number;
  ranking: number;
  ageGroup: string; //TODO: enum으로 교체
  oldRanking: number;
}
