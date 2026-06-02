import type { ApiPage } from '../../api/types';
import type { ProductCardType } from '../product/product.types';
import type { PreviewInfoDto } from '../product/product.dto';
import { mapPreviewInfoDtoToCard } from '../product/product.mapper';
import type { CreatorRankingDto } from '../creator/creator.dto';
import type { CreatorRankingUpDownType } from '../creator/creator.types';

export const mapProductRankingPageDtoToCards = (
  page: ApiPage<PreviewInfoDto>
): ApiPage<ProductCardType> => ({
  ...page,
  content: page.content.map(mapPreviewInfoDtoToCard),
});

export const mapProductPreviewRankingPageDtoToCards = (
  page: ApiPage<PreviewInfoDto>
): ApiPage<ProductCardType> => ({
  ...page,
  content: page.content.map(mapPreviewInfoDtoToCard),
});

export const rankingMapper = <T>(data: T): T => data;

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
  ...creator
}: CreatorRankingDto): CreatorRankingUpDownType => {
  const rankingDiff = creator.ranking - oldRanking;

  return {
    ...creator,
    rankChange: Math.abs(rankingDiff),
    rankChangeDiff: getRankChangeDiff(creator.ranking, oldRanking),
  };
};

export const mapCreatorRankingPage = (
  page: ApiPage<CreatorRankingDto>
): ApiPage<CreatorRankingUpDownType> => ({
  ...page,
  content: page.content.map(mapCreatorRanking),
});
