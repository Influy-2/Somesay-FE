import type { BrandProductType } from '@somesay/shared';
import { SearchResultProductCard } from '@/shared/components';
import type { Ref } from 'react';

interface BrandProductListProps {
  products: BrandProductType[];
  onHeartToggle: (productId: number) => void;
  isLoading: boolean;
  isError: boolean;
  emptyMessage: string;
  isFetchingNextPage: boolean;
  isFetchNextPageError: boolean;
  onRetry: () => void;
  onRetryNextPage: () => void;
  loadMoreRef: Ref<HTMLDivElement>;
}

export const BrandProductList = ({
  products,
  onHeartToggle,
  isLoading,
  isError,
  emptyMessage,
  isFetchingNextPage,
  isFetchNextPageError,
  onRetry,
  onRetryNextPage,
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
      <div className="flex flex-col items-center gap-3 px-4 py-16 text-center">
        <p className="body2-m text-grey06">상품을 불러오지 못했어요.</p>
        <button
          type="button"
          className="body2-sb border-grey03 text-grey-black border px-4 py-2"
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
      <div ref={loadMoreRef} className="min-h-10 pb-10">
        {isFetchingNextPage && (
          <p className="body2-m text-grey06 py-4 text-center">
            상품을 더 불러오는 중이에요.
          </p>
        )}
        {isFetchNextPageError && !isFetchingNextPage && (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <p className="body2-m text-grey06">상품을 더 불러오지 못했어요.</p>
            <button
              type="button"
              className="body2-sb border-grey03 text-grey-black border px-4 py-2"
              onClick={onRetryNextPage}
            >
              다시 시도
            </button>
          </div>
        )}
      </div>
    </>
  );
};
