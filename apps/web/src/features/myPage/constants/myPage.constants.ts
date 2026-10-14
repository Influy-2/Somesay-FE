import type {
  GenderType,
  UserProductSearchSortType,
  UserProductStatusType,
} from '@somesay/shared';

// 서버 gender enum의 한글 표기입니다.
// Record<GenderType, _>라 enum에 값이 늘면 라벨 누락을 컴파일러가 잡습니다.
export const GENDER_LABELS: Record<GenderType, string> = {
  MALE: '남성',
  FEMALE: '여성',
  NONE: '해당없음',
};

// 상품 검색 API가 받는 정렬 기준만 노출합니다. 라벨은 Figma 표기를 따릅니다.
export const PRODUCT_FIT_SEARCH_SORT_OPTIONS: {
  value: UserProductSearchSortType;
  label: string;
}[] = [
  { value: 'RATING_DESC', label: '평점순' },
  { value: 'PRICE_ASC', label: '가격 낮은 순' },
  { value: 'PRICE_DESC', label: '가격 높은 순' },
];

// 상품 추가 화면의 제목입니다. 목록·검색 두 화면이 같은 제목을 씁니다.
export const PRODUCT_FIT_TITLES: Record<UserProductStatusType, string> = {
  MATCHED: '잘 맞았던 제품',
  MISMATCHED: '안 맞았던 제품',
};
