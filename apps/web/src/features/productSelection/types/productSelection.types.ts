import type { ProductBasicType } from '@somesay/shared';

export type SelectableProduct = Pick<
  ProductBasicType,
  'productId' | 'productImgUrl' | 'brandName' | 'productName'
> & {
  categoryId: number;
};

export interface ProductCategory {
  id: number;
  label: string;
}
