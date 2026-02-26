import { MOCK_PRODUCT_RANKING_CARDS } from './mockData';
import { ProductRankingCard } from './ProductRankingCard';

export const ProductRankingSection = () => {
  return (
    <section
      aria-labelledby="product-ranking-title"
      className="flex w-full flex-col items-center justify-center gap-5 px-4"
    >
      <h2 id="product-ranking-title" className="headline4 w-full">
        평점이 가장 좋은 제품 랭킹
      </h2>
      <div className="grid grid-cols-2 grid-rows-2 content-start items-start gap-[1.5rem_.25rem] self-stretch">
        {MOCK_PRODUCT_RANKING_CARDS.map((product) => (
          <ProductRankingCard {...product} />
        ))}
      </div>
    </section>
  );
};
