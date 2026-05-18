export interface CreatorType {
  creatorId: number;
  nickname: string;
  profileImageUrl: string;
  youtubeLink: string;
  trustScore: number;
  skinType: string;
  personalColor: string;
  subscriberCount: number;
  ranking: number;
  ageGroup: number;
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

export type BasicCreatorProfileType = Pick<
  CreatorType,
  | 'creatorId'
  | 'nickname'
  | 'profileImageUrl'
  | 'subscriberCount'
  | 'trustScore'
  | 'ageGroup'
  | 'skinType'
>;
