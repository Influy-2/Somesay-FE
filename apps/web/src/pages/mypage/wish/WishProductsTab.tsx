import {
  WISH_PRODUCT_SORT_OPTIONS,
  WishLoadMore,
  WishProductList,
  useWishProducts,
} from '@/features/myPage';
import { HorizontalCategoriesTab, SortBar } from '@/shared/components';

export const WishProductsTab = () => {
  const { tabProps, sortProps, listProps, loadMoreProps } = useWishProducts();

  return (
    <section aria-label="찜한 상품">
      <div className="px-4 pt-5 pb-3.5">
        <HorizontalCategoriesTab {...tabProps} ariaLabel="찜한 상품 카테고리" />
      </div>
      <div className="pb-2.5">
        <SortBar sortOptions={WISH_PRODUCT_SORT_OPTIONS} {...sortProps} />
      </div>
      <WishProductList {...listProps} />
      <WishLoadMore {...loadMoreProps} />
    </section>
  );
};
