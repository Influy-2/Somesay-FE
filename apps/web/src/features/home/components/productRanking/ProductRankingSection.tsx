import { getRankingTabPath } from '@/features/ranking';
import {
  HomeProductRankingCard,
  LoadingBlock,
  MoreButton,
} from '@/shared/components';
import { useFetchHomeProductRanking, useProductWish } from '@/shared/hooks';

const PRODUCT_RANKING_LOADING_CARD_COUNT = 4;

export const ProductRankingSection = () => {
  const { toggleWish } = useProductWish();
  const {
    data: productsRankingData = [],
    isPending,
    isError,
  } = useFetchHomeProductRanking();

  if (isError || (!isPending && productsRankingData.length === 0)) {
    return null;
  }

  return (
    <section
      aria-labelledby="product-ranking-title"
      aria-busy={isPending}
      className="flex w-full flex-col items-center justify-center gap-6 px-4"
    >
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <h2 id="product-ranking-title" className="headline4 w-full">
          평점이 가장 높은 제품 랭킹
        </h2>
        <div
          className="grid grid-cols-2 grid-rows-2 content-start items-start gap-[1.5rem_.25rem] self-stretch"
          {...(isPending && {
            role: 'status',
            'aria-label': '제품 랭킹을 불러오는 중',
          })}
        >
          {isPending
            ? Array.from({ length: PRODUCT_RANKING_LOADING_CARD_COUNT }).map(
                (_, index) => (
                  <LoadingBlock
                    key={`product-ranking-loading-${index}`}
                    className="h-[18.25rem] w-full"
                  />
                )
              )
            : productsRankingData.map((product, index) => (
                <HomeProductRankingCard
                  {...product}
                  ranking={index + 1}
                  onHeartToggle={() =>
                    toggleWish({
                      productId: product.productId,
                      isHearted: product.isHearted,
                    })
                  }
                  key={product.productId}
                />
              ))}
        </div>
      </div>
      {!isPending && (
        <MoreButton to={getRankingTabPath('products')} text="랭킹 더보기" />
      )}
    </section>
  );
};
