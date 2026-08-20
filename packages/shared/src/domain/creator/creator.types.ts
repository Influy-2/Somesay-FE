export interface CreatorType {
  creatorId: number;
  creatorName: string;
  profileImgUrl: string;
  youtubeLink: string;
  trustScore: number;
  skinTypes: string[];
  personalColor: string;
  subscriberNum: number;
  ranking: number;
  ageGroup: string;
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
  | 'creatorName'
  | 'profileImgUrl'
  | 'subscriberNum'
  | 'trustScore'
  | 'ageGroup'
  | 'skinTypes'
>;
