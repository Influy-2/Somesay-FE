export type ID = number;
export type ISODateTimeString = string;

export interface CreatorType {
  creatorId: ID; // BIGINT
  nickname: string; // VARCHAR(50)
  profileImageUrl: string; // VARCHAR(500)
  youtubeLink: string; // VARCHAR(500)
  trustScore: number; // DECIMAL(5,2)
  skinType: string; // ENUM (values not provided)
  personalColor: string; // ENUM (values not provided)
  subscriberCount: number;
  ranking: number; // INT
  ageGroup: number; // INT (20, 30, 40...)
}

type RankChangeDirection = 'up' | 'down' | 'same';

export interface CreatorRankingUpDownType extends Pick<
  CreatorType,
  | 'creatorId'
  | 'nickname'
  | 'profileImageUrl'
  | 'subscriberCount'
  | 'trustScore'
  | 'ageGroup'
  | 'skinType'
  | 'ranking'
> {
  rankChange: RankChangeDirection;
  rankChangeDiff: number;
}
