import type { BrandProductType } from '@somesay/shared';
import { SearchResultProductCard } from '@/shared/components';
import type { RefObject } from 'react';

interface BrandProductListProps {
  products: BrandProductType[];
  onHeartToggle: (productId: number) => void;
  isLoading: boolean;
  isError: boolean;
  emptyMessage: string;
  isFetchingNextPage: boolean;
  loadMoreRef: RefObject<HTMLDivElement | null>;
}

export const BrandProductList = ({
  products,
  onHeartToggle,
  isLoading,
  isError,
  emptyMessage,
  isFetchingNextPage,
  loadMoreRef,
}: BrandProductListProps) => {
  if (isLoading) {
    return (
      <p className="body2-m text-grey06 px-4 py-16 text-center">
        상품을 불러오는 중이에요.
      </p>
    );
  }

  if (isError && products.length === 0) {
    return (
      <p className="body2-m text-grey06 px-4 py-16 text-center">
        상품을 불러오지 못했어요.
      </p>
    );
  }

  if (products.length === 0) {
    return (
      <p className="body2-m text-grey06 px-4 py-16 text-center">
        {emptyMessage}
      </p>
    );
  }

  return (
    <>
      <ul className="flex flex-col gap-6 pt-2" aria-label="브랜드 상품 목록">
        {products.map((product) => (
          <li key={product.productId}>
            <SearchResultProductCard
              product={product}
              onHeartToggle={onHeartToggle}
            />
          </li>
        ))}
      </ul>
      <div ref={loadMoreRef} className="min-h-10 pb-10" aria-hidden="true">
        {isFetchingNextPage && (
          <p className="body2-m text-grey06 py-4 text-center">
            상품을 더 불러오는 중이에요.
          </p>
        )}
      </div>
    </>
  );
};
