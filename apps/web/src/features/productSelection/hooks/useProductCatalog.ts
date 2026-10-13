import { useMemo } from 'react';
import { MOCK_PRODUCT_CATALOG } from '../mock';
import { filterSelectableProducts } from '../utils/productSelection.utils';

export const useProductCatalog = (categoryId = 0, query = '') =>
  useMemo(
    () => filterSelectableProducts(MOCK_PRODUCT_CATALOG, categoryId, query),
    [categoryId, query]
  );
