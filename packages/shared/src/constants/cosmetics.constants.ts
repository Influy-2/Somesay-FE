import type {
  FilterCategory,
  SkinTypeOption,
  SkinConcernOption,
  ProductSubCategoryGroup,
} from '../types/category.types';

export const FILTER_CATEGORIES: { key: FilterCategory; label: string }[] = [
  { key: 'skinConcern', label: '피부 고민' },
  { key: 'skinType', label: '피부 타입' },
  { key: 'productCategory', label: '제품군' },
];

// TODO: skinConcernId는 백엔드 API 응답값으로 교체 필요
export const SKIN_CONCERN_OPTIONS: SkinConcernOption[] = [
  { skinConcernId: 0, label: '보습' },
  { skinConcernId: 0, label: '속건조' },
  { skinConcernId: 0, label: '진정' },
  { skinConcernId: 0, label: '여드름' },
  { skinConcernId: 0, label: '붉은기' },
  { skinConcernId: 0, label: '미백/잡티' },
  { skinConcernId: 0, label: '주름/탄력' },
  { skinConcernId: 0, label: '모공' },
  { skinConcernId: 0, label: '피부결' },
  { skinConcernId: 0, label: '각질' },
  { skinConcernId: 0, label: '피부장벽' },
  { skinConcernId: 0, label: '흔적' },
];
// ⚠️ skinTypeId는 백엔드 API 응답값으로 교체 필요
export const SKIN_TYPE_OPTIONS: SkinTypeOption[] = [
  { skinTypeId: 0, label: '건성' },
  { skinTypeId: 0, label: '지성' },
  { skinTypeId: 0, label: '복합성' },
  { skinTypeId: 0, label: '수부지' },
  { skinTypeId: 0, label: '민감성' },
  { skinTypeId: 0, label: '여드름성' },
  { skinTypeId: 0, label: '모르겠음' },
];

// ⚠️ productCategoryId는 백엔드 API 응답값으로 교체 필요
export const PRODUCT_SUB_CATEGORY_GROUPS: ProductSubCategoryGroup[] = [
  {
    categoryLabel: '스킨케어',
    subcategories: [
      { subCategoryId: 0, label: '스킨/토너' },
      { subCategoryId: 0, label: '로션/에멀전' },
      { subCategoryId: 0, label: '에센스/앰플/세럼' },
      { subCategoryId: 0, label: '크림' },
      { subCategoryId: 0, label: '미스트/오일' },
    ],
  },
  {
    categoryLabel: '마스크/팩',
    subcategories: [
      { subCategoryId: 0, label: '시트 마스크' },
      { subCategoryId: 0, label: '스킨/토너 패드' },
      { subCategoryId: 0, label: '코팩' },
      { subCategoryId: 0, label: '기타 마스크' },
    ],
  },
  {
    categoryLabel: '클렌징',
    subcategories: [
      { subCategoryId: 0, label: '클렌징 폼' },
      { subCategoryId: 0, label: '클렌징 오일' },
      { subCategoryId: 0, label: '클렌징 밤' },
      { subCategoryId: 0, label: '클렌징 워터/밀크' },
      { subCategoryId: 0, label: '필링/스크럽' },
    ],
  },
  {
    categoryLabel: '선케어',
    subcategories: [
      { subCategoryId: 0, label: '선크림' },
      { subCategoryId: 0, label: '선앰플' },
    ],
  },
  {
    categoryLabel: '베이스 메이크업',
    subcategories: [
      { subCategoryId: 0, label: '메이크업 베이스' },
      { subCategoryId: 0, label: '쿠션' },
      { subCategoryId: 0, label: '파운데이션' },
    ],
  },
];
