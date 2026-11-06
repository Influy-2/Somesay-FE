import type { ApiPage } from '../../api/types';
import type { CreatorRankingDto } from '../creator/creator.dto';
import type { CreatorRankingUpDownType } from '../creator/creator.types';
import type { HomeCreatorRankingType } from './ranking.types';

// 크리에이터 랭킹 변동 방향 계산 함수
const getRankChangeDiff = (
  ranking: number,
  oldRanking: number
): CreatorRankingUpDownType['rankChangeDiff'] => {
  const rankingDiff = ranking - oldRanking;

  if (rankingDiff < 0) return 'up';
  if (rankingDiff > 0) return 'down';
  return 'same';
};

export const mapCreatorRanking = ({
  oldRanking,
  creatorName,
  profileImgUrl,
  creatorId,
  youtubeLink,
  trustScore,
  skinTypeIds,
  subscriberNum,
  ranking,
  age,
}: CreatorRankingDto): CreatorRankingUpDownType => {
  const rankingDiff = ranking - oldRanking;

  return {
    creatorId,
    creatorName,
    profileImgUrl,
    youtubeLink,
    trustScore,
    skinTypeIds,
    subscriberNum,
    ranking,
    age,
    rankChange: Math.abs(rankingDiff),
    rankChangeDiff: getRankChangeDiff(ranking, oldRanking),
  };
};

export const mapCreatorRankingPage = (
  page: ApiPage<CreatorRankingDto>
): ApiPage<CreatorRankingUpDownType> => ({
  ...page,
  content: page.content.map(mapCreatorRanking),
});

// 홈 크리에이터 랭킹은 랭킹 목록과 응답 모양이 같아 같은 변환을 재사용합니다.
export const mapHomeCreatorRanking = (
  data: CreatorRankingDto[]
): HomeCreatorRankingType[] => data.map(mapCreatorRanking);
