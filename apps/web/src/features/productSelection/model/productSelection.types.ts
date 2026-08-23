import type { ProductBasicType } from '@somesay/shared';

export type SelectableProduct = Pick<
  ProductBasicType,
  'productId' | 'productImageUrl' | 'brandName' | 'productName'
> & {
  categoryId: number;
};

export interface ProductCategory {
  id: number;
  label: string;
}
