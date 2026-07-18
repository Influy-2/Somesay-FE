import type { SelectableProduct } from './productSelection.types';

const normalizeSearchText = (value: string) =>
  value.replace(/\s/g, '').toLocaleLowerCase();

export const filterSelectableProducts = (
  products: SelectableProduct[],
  categoryId: number,
  query: string
) => {
  const normalizedQuery = normalizeSearchText(query);

  return products.filter((product) => {
    const matchesCategory =
      categoryId === 0 || product.categoryId === categoryId;
    const matchesQuery =
      !normalizedQuery ||
      normalizeSearchText(
        `${product.brandName}${product.productName}`
      ).includes(normalizedQuery);

    return matchesCategory && matchesQuery;
  });
};

export const getProductsByIds = (
  products: SelectableProduct[],
  productIds: number[]
) => {
  const productById = new Map(
    products.map((product) => [product.productId, product])
  );

  return productIds.flatMap((productId) => {
    const product = productById.get(productId);
    return product ? [product] : [];
  });
};

export const hasReachedProductLimit = (
  selectedProductIds: number[],
  productId: number,
  limit: number
) =>
  selectedProductIds.length >= limit && !selectedProductIds.includes(productId);
