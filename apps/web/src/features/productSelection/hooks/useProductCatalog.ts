import { useMemo } from 'react';
import { MOCK_PRODUCT_CATALOG } from '../mocks/productSelection.mock';
import { filterSelectableProducts } from '../model/productSelection.utils';

export const useProductCatalog = (categoryId = 0, query = '') =>
  useMemo(
    () => filterSelectableProducts(MOCK_PRODUCT_CATALOG, categoryId, query),
    [categoryId, query]
  );
