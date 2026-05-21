import { ProductRankingCard } from './ProductRankingCard';
import { MoreButton } from '@/shared/components';
import { useFetchProductsRanking } from '@/shared/hooks/ranking/useFetchProductsRanking';

export const ProductRankingSection = () => {
  const {
    data: productsRankingData,
    // isLoading,
    // isError,
    // fetchNextPage,
    // hasNextPage,
    // isFetchingNextPage,
  } = useFetchProductsRanking({
    size: 4,
  });
  console.log('productsRankingData:', productsRankingData);
  return (
    <section
      aria-labelledby="product-ranking-title"
      className="flex w-full flex-col items-center justify-center gap-6 px-4"
    >
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <h2 id="product-ranking-title" className="headline4 w-full">
          평점이 가장 좋은 제품 랭킹
        </h2>
        <div className="grid grid-cols-2 grid-rows-2 content-start items-start gap-[1.5rem_.25rem] self-stretch">
          {productsRankingData?.pages
            .flatMap((page) => page.content)
            .map((product, index) => (
              <ProductRankingCard
                {...product}
                ranking={index + 1}
                key={product.productId}
              />
            ))}
        </div>
      </div>
      {/* TODO: 경로 수정 */}
      <MoreButton to={'/임시'} text="랭킹 더보기" />
    </section>
  );
};
