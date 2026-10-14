export { ProductSearchHeader } from './components/ProductSearchHeader';
export { ProductSearchTrigger } from './components/ProductSearchTrigger';
export { RecentProductSearchList } from './components/RecentProductSearchList';
export { SelectableProductList } from './components/SelectableProductList';
export { SelectedProductDock } from './components/SelectedProductDock';
export { useProductCatalog } from './hooks/useProductCatalog';
export { useRecentProductSearchStore } from './stores/recentProductSearch.store';
export { MOCK_PRODUCT_CATALOG } from './mock';
export {
  MAX_PRODUCT_SELECTION,
  PRODUCT_CATEGORIES,
} from './constants/productSelection.constants';
export type {
  ProductCategory,
  SelectableProduct,
  SelectableProductItem,
} from './types/productSelection.types';
export {
  filterSelectableProducts,
  getProductsByIds,
  hasReachedProductLimit,
} from './utils/productSelection.utils';
