import { ProductCardThumbnail } from '@/shared/components/thumbnail/ProductCardThumbnail';

//임시
const skinType = '';

const MOCK_PRODUCT_THUMBNAILS = {
  brand: '토리든',
  productName: '캐롯 캐롯 캐롯 캐롯 카로팅 카밍 세럼',
  price: 10000,
  rating: 4.9,
  reviewCount: 1123,
  imageUrl:
    'https://www.figma.com/api/mcp/asset/91dd6a94-e9c4-480c-8452-3d916c193bb2',
};

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

      <ProductCardThumbnail
        brand={MOCK_PRODUCT_THUMBNAILS.brand}
        productName={MOCK_PRODUCT_THUMBNAILS.productName}
        price={MOCK_PRODUCT_THUMBNAILS.price}
        rating={MOCK_PRODUCT_THUMBNAILS.rating}
        reviewCount={MOCK_PRODUCT_THUMBNAILS.reviewCount}
        imageUrl={MOCK_PRODUCT_THUMBNAILS.imageUrl}
      />
    </section>
  );
};
