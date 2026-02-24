import { ProductCard } from './ProductCard';

//임시
const skinType = '';

export const BestReviewSection = () => {
  return (
    <section
      aria-labelledby="best-review-title"
      className="flex w-full flex-col items-center justify-center gap-5 px-4"
    >
      <h2 id="best-review-title" className="headline4 w-full">
        {skinType
          ? `${skinType} 유저들이 가장 많이 공감한 리뷰`
          : '유저들이 가장 많이 공감한 리뷰'}
      </h2>

      <ProductCard />
    </section>
  );
};
