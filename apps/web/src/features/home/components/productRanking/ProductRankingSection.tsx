import { getRankingTabPath } from '@/features/ranking';
import { HomeProductRankingCard, MoreButton } from '@/shared/components';
import { useFetchHomeProductRanking, useProductWish } from '@/shared/hooks';
import { ProductRankingSectionSkeleton } from './ProductRankingSectionSkeleton';

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
        {isPending ? (
          <ProductRankingSectionSkeleton />
        ) : (
          <div className="grid grid-cols-2 grid-rows-2 content-start items-start gap-[1.5rem_.25rem] self-stretch">
            {productsRankingData.map((product, index) => (
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
        )}
      </div>
      <MoreButton to={getRankingTabPath('products')} text="랭킹 더보기" />
    </section>
  );
};
