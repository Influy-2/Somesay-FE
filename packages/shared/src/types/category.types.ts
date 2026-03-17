export interface SubCategoryType {
  id: number;
  name: string;
}

export interface CategoryType {
  id: number;
  title: string;
  subCategories?: SubCategoryType[];
}

export type FilterCategoryType = 'skinConcern' | 'skinType' | 'productCategory';

// 피부 고민 (최대 2개)
export type SkinConcern =
  | '보습'
  | '속건조'
  | '진정'
  | '여드름'
  | '붉은기'
  | '미백/잡티'
  | '주름/탄력'
  | '모공'
  | '피부결'
  | '각질'
  | '피부장벽'
  | '흔적';

// 피부 타입 (최대 1개)
export type SkinType =
  | '건성'
  | '지성'
  | '복합성'
  | '수부지'
  | '민감성'
  | '여드름성'
  | '모르겠음';

// 제품군 소분류
export type ProductSubCategory =
  // 스킨케어
  | '스킨/토너'
  | '로션/에멀전'
  | '에센스/앰플/세럼'
  | '크림'
  | '미스트/오일'
  // 마스크/팩
  | '시트 마스크'
  | '스킨/토너 패드'
  | '코팩'
  | '기타 마스크'
  // 클렌징
  | '클렌징 폼'
  | '클렌징 오일'
  | '클렌징 밤'
  | '클렌징 워터/밀크'
  | '필링/스크럽'
  // 선케어
  | '선크림'
  | '선앰플'
  // 베이스 메이크업
  | '메이크업 베이스'
  | '쿠션'
  | '파운데이션';

// 제품군 선택값: '전체' 또는 소분류 중 하나
export type ProductCategoryValue = '전체' | ProductSubCategory;

export interface ProductFilterState {
  skinConcerns: SkinConcern[];
  skinType: SkinType | null;
  productCategory: ProductCategoryValue | null;
}
