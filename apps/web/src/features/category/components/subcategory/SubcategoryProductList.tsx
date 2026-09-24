import { SearchResultProductCard } from '@/shared/components';
import type { CategoryProductType } from '@somesay/shared';

interface SubcategoryProductListProps {
  products: CategoryProductType[];
  onHeartToggle: (productId: number) => void;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

export const SubcategoryProductList = ({
  products,
  onHeartToggle,
  isLoading,
  isError,
  onRetry,
}: SubcategoryProductListProps) => {
  // TODO: SubcategoryProductListSkeleton으로 교체
  if (isLoading) {
    return (
      <p role="status" className="body2-m text-grey06 px-4 py-16 text-center">
        상품을 불러오는 중이에요.
      </p>
    );
  }

  // 다음 페이지 실패는 SubcategoryLoadMore가 안내하므로, 목록이 비었을 때만 여기서 막습니다.
  if (isError && products.length === 0) {
    return (
      <div
        role="alert"
        className="flex flex-col items-center gap-3 px-4 py-16 text-center"
      >
        <p className="body2-m text-grey06">
          상품을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
        </p>
        <button
          type="button"
          className="body2-sb border-grey03 border px-4 py-2 text-black"
          onClick={onRetry}
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <p className="body2-m text-grey06 px-4 py-16 text-center">
        해당 카테고리에 등록된 상품이 없어요.
      </p>
    );
  }

  return (
    <ul aria-label="상품 목록" className="flex flex-col gap-6">
      {products.map((product) => (
        <li key={product.productId}>
          <SearchResultProductCard
            product={product}
            onHeartToggle={onHeartToggle}
          />
        </li>
      ))}
    </ul>
  );
};
