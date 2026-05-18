export interface CreatorRankingResponseDto {
  creatorId?: number;
  nickname?: string;
  profileImageUrl?: string;
  youtubeLink?: string;
  ageGroup?: string;
  skinTypes?: string[];
  subscriberNum?: number;
  ranking?: number;
  oldRanking?: number;
  trustScore?: number;
}
