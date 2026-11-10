import type { CreatorRankingResponse } from '../../api/schema';

/**
 * 크리에이터 프로필 묶음입니다.
 * 랭킹·홈 큐레이션 리뷰 카드·상품 리뷰·리뷰 검색 응답에 같은 이름으로 평탄하게 실려,
 * 응답 객체를 그대로 프로필 컴포넌트에 넘길 수 있습니다. (예: `creator={review}`)
 */
export type BasicCreatorProfileType = Pick<
  CreatorRankingResponse,
  | 'creatorId'
  | 'creatorName'
  | 'creatorProfileImgUrl'
  | 'creatorAge'
  | 'creatorSkinTypes'
  | 'creatorSubscriberNum'
>;

type RankChangeDirection = 'up' | 'down' | 'same';

// 크리에이터 랭킹 응답에 화면이 계산한 순위 변동을 더한 타입입니다. (조회 훅의 select 에서 계산)
export type CreatorRankingUpDownType = CreatorRankingResponse & {
  rankChange: number;
  rankChangeDiff: RankChangeDirection;
};
