import type { ProductBasicType } from '@somesay/shared';

// 선택 목록·dock이 화면에 그리는 데 필요한 최소 필드입니다.
// 실제 API 상품은 categoryId를 갖지 않으므로 표시용 타입을 따로 둡니다.
export type SelectableProductItem = Pick<
  ProductBasicType,
  'productId' | 'productImgUrl' | 'brandName' | 'productName'
>;

// mock 카탈로그를 카테고리로 거르기 위해 categoryId를 더한 타입입니다.
export type SelectableProduct = SelectableProductItem & {
  categoryId: number;
};

export interface ProductCategory {
  id: number;
  label: string;
}

// 최근 검색어 한 건입니다. id는 삭제 대상을 가리키는 데만 씁니다.
export interface RecentProductSearchItem {
  id: string;
  query: string;
}
