export interface CreatorType {
  creatorId: number;
  nickname: string;
  profileImageUrl: string;
  youtubeLink: string;
  trustScore: number;
  skinTypes: string[];
  personalColor: string;
  subscriberNum: number;
  ranking: number;
  ageGroup: number;
}

type RankChangeDirection = 'up' | 'down' | 'same';

export interface CreatorRankingUpDownType extends Omit<
  CreatorType,
  'personalColor'
> {
  rankChange: number;
  rankChangeDiff: RankChangeDirection;
}

export type BasicCreatorProfileType = Pick<
  CreatorType,
  | 'creatorId'
  | 'nickname'
  | 'profileImageUrl'
  | 'subscriberNum'
  | 'trustScore'
  | 'ageGroup'
  | 'skinTypes'
>;
