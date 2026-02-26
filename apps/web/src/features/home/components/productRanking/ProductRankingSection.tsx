import { MOCK_PRODUCT_RANKING_CARDS } from './mockData';
import { ProductRankingCard } from './ProductRankingCard';
import { MoreButton } from '@/shared/components';
export const ProductRankingSection = () => {
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
          {MOCK_PRODUCT_RANKING_CARDS.map((product) => (
            <ProductRankingCard {...product} />
          ))}
        </div>
      </div>
      {/* TODO: 경로 수정 */}
      <MoreButton to={'/임시'} text="랭킹 더보기" />
    </section>
  );
};
