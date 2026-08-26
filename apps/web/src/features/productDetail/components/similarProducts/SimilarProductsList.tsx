import { HorizontalScrollProductCard } from '@/shared/components';
import { useProductWish } from '@/shared/hooks';
import type { ProductCardType } from '@somesay/shared';

interface SimilarProductsListProps {
  products: ProductCardType[];
}

export const SimilarProductsList = ({ products }: SimilarProductsListProps) => {
  const { toggleWish } = useProductWish();

  // 유사 상품이 없으면 제목만 남으므로 섹션째 그리지 않습니다.
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col gap-5 bg-white pt-5">
      <h2 className="headline4 px-4 whitespace-pre-line text-black">
        {'이 상품과 비슷한\n기대효과를 가지고 있어요'}
      </h2>

      <ul className="flex gap-2 overflow-x-auto px-4 [&::-webkit-scrollbar]:hidden">
        {products.map((product) => (
          <li key={product.productId}>
            <HorizontalScrollProductCard
              {...product}
              onHeartToggle={() =>
                toggleWish({
                  productId: product.productId,
                  isHearted: product.isHearted,
                })
              }
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
