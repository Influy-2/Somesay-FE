import type { ProductBasicType } from '@somesay/shared';

// 선택 카드·dock이 그리는 데 필요한 최소 상품 필드입니다. 실제 API 상품과 mock 상품이 함께 맞춥니다.
export type SelectableProductItem = Pick<
  ProductBasicType,
  'productId' | 'productImgUrl' | 'brandName' | 'productName'
>;

// 카테고리 탭 하나입니다.
export interface ProductSelectionCategory {
  id: number;
  label: string;
}

// 최근 검색어 한 건입니다. id는 삭제 대상을 가리키는 데만 씁니다.
export interface RecentProductSearchItem {
  id: string;
  query: string;
}

// 카드 목록의 조회 상태입니다. 로딩·실패·완료를 한 값으로 받아 props 수를 줄입니다.
export type SelectableProductListStatus = 'loading' | 'error' | 'ready';
