import type {
  CreatorRankingResponse,
  CreatorRankingUpDownType,
} from '@somesay/shared';

/**
 * 크리에이터 랭킹 응답에 순위 변동(rankChange·rankChangeDiff)을 더합니다.
 * 랭킹 목록·홈 랭킹 조회 훅의 select 에서 씁니다.
 *
 * 지난 순위(`creatorOldRanking`)는 새로 랭킹에 든 크리에이터면 null 입니다.
 * 예전에는 `순위 - null` 이 순위 자체가 되어 "N단계 하락"으로 보였으므로, 비교할 값이 없으면 변동 없음으로 둡니다.
 * TODO: 신규 진입("NEW") 표시가 필요한지 기획 확인
 */
export const withRankChange = (
  creator: CreatorRankingResponse
): CreatorRankingUpDownType => {
  const { creatorRanking, creatorOldRanking } = creator;

  if (creatorRanking == null || creatorOldRanking == null) {
    return { ...creator, rankChange: 0, rankChangeDiff: 'same' };
  }

  const rankingDiff = creatorRanking - creatorOldRanking;

  return {
    ...creator,
    rankChange: Math.abs(rankingDiff),
    rankChangeDiff: rankingDiff < 0 ? 'up' : rankingDiff > 0 ? 'down' : 'same',
  };
};
