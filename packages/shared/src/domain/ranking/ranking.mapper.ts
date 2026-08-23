import type { ApiPage } from '../../api/types';
import type { ProductCardType } from '../product/product.types';
import type { PreviewInfoDto } from '../product/product.dto';
import { mapProductCardDtoToCard } from '../product/product.mapper';
import type { CreatorRankingDto } from '../creator/creator.dto';
import type { CreatorRankingUpDownType } from '../creator/creator.types';
import type {
  HomeCreatorRankingDto,
  HomeProductRankingResponseDto,
} from './ranking.dto';
import type { HomeCreatorRankingType } from './ranking.types';

export const mapProductRankingPageDtoToCards = (
  page: ApiPage<PreviewInfoDto>
): ApiPage<ProductCardType> => ({
  ...page,
  content: page.content.map(mapProductCardDtoToCard),
});

export const mapProductPreviewRankingPageDtoToCards = (
  page: ApiPage<PreviewInfoDto>
): ApiPage<ProductCardType> => ({
  ...page,
  content: page.content.map(mapProductCardDtoToCard),
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

// 홈 상품 랭킹 응답을 기존 상품 카드 타입으로 변환합니다.
export const mapHomeProductRanking = (
  data: HomeProductRankingResponseDto
): ProductCardType[] =>
  data.products.map((product) =>
    mapProductCardDtoToCard({
      ...product,
      productImgUrl: product.productImgUrl ?? '',
      price: product.price ?? 0,
    })
  );

// 홈 크리에이터 랭킹 응답의 잘못된 0위 값을 목록 순서로 보정합니다.
export const mapHomeCreatorRanking = (
  data: HomeCreatorRankingDto[]
): HomeCreatorRankingType[] =>
  data.map(
    ({
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
    }) => {
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
    }
  );
