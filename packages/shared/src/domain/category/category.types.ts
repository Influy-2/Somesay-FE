export interface CategoryType {
  categoryId: number;
  categoryLabel: string;
}

type SkinConcern =
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
  | '피부 장벽'
  | '흔적';

type SkinType =
  | '건성'
  | '지성'
  | '복합성'
  | '수부지'
  | '민감성'
  | '여드름성'
  | '모르겠음';

type Subcategory =
  | '전체'
  | '스킨/토너'
  | '로션/에멀전'
  | '에센스/앰플/세럼'
  | '크림'
  | '미스트/오일'
  | '시트 마스크'
  | '스킨/토너 패드'
  | '코팩'
  | '기타 마스크'
  | '클렌징 폼'
  | '클렌징 오일'
  | '클렌징 밤'
  | '클렌징 워터/밀크'
  | '필링/스크럽'
  | '선크림'
  | '선앰플'
  | '메이크업 베이스'
  | '쿠션'
  | '파운데이션';

type Effect =
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

export interface SkinConcernOption {
  skinConcernId: number;
  label: SkinConcern;
}

export interface SkinTypeOption {
  skinTypeId: number;
  label: SkinType;
}

export interface EffectOption {
  effectId: number;
  label: Effect;
}

export interface SubcategoryOption {
  subCategoryId: number;
  label: Subcategory;
}

export interface SubcategoryGroup {
  categoryId: number;
  categoryLabel: string;
  subcategories: SubcategoryOption[];
}
