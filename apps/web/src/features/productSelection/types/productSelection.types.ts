import type { ProductCard } from '@somesay/shared';

export type SelectableProduct = Pick<
  ProductCard,
  'productId' | 'productImgUrl' | 'brandName' | 'productName'
> & {
  categoryId: number;
};

export interface ProductCategory {
  id: number;
  label: string;
}
