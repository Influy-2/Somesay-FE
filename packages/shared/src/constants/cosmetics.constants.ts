import type {
  SkinTypeOption,
  SkinConcernOption,
  ProductSubCategoryGroup,
} from '../types/category.types';

// TODO: skinConcernId는 백엔드 API 응답값으로 교체 필요
export const SKIN_CONCERN_OPTIONS: SkinConcernOption[] = [
  { skinConcernId: 1, label: '보습' },
  { skinConcernId: 2, label: '속건조' },
  { skinConcernId: 3, label: '진정' },
  { skinConcernId: 4, label: '여드름' },
  { skinConcernId: 5, label: '붉은기' },
  { skinConcernId: 6, label: '미백/잡티' },
  { skinConcernId: 7, label: '주름/탄력' },
  { skinConcernId: 8, label: '모공' },
  { skinConcernId: 9, label: '피부결' },
  { skinConcernId: 10, label: '각질' },
  { skinConcernId: 11, label: '피부장벽' },
  { skinConcernId: 12, label: '흔적' },
];

// ⚠️ skinTypeId는 백엔드 API 응답값으로 교체 필요
export const SKIN_TYPE_OPTIONS: SkinTypeOption[] = [
  { skinTypeId: 1, label: '건성' },
  { skinTypeId: 2, label: '지성' },
  { skinTypeId: 3, label: '복합성' },
  { skinTypeId: 4, label: '수부지' },
  { skinTypeId: 5, label: '민감성' },
  { skinTypeId: 6, label: '여드름성' },
  { skinTypeId: 7, label: '모르겠음' },
];

// ⚠️ productCategoryId는 백엔드 API 응답값으로 교체 필요
export const PRODUCT_SUB_CATEGORY_GROUPS: ProductSubCategoryGroup[] = [
  {
    categoryLabel: '전체',
    subcategories: [{ subCategoryId: 1, label: '전체' }],
  },
  {
    categoryLabel: '스킨케어',
    subcategories: [
      { subCategoryId: 2, label: '스킨/토너' },
      { subCategoryId: 3, label: '로션/에멀전' },
      { subCategoryId: 4, label: '에센스/앰플/세럼' },
      { subCategoryId: 5, label: '크림' },
      { subCategoryId: 6, label: '미스트/오일' },
    ],
  },
  {
    categoryLabel: '마스크/팩',
    subcategories: [
      { subCategoryId: 7, label: '시트 마스크' },
      { subCategoryId: 8, label: '스킨/토너 패드' },
      { subCategoryId: 9, label: '코팩' },
      { subCategoryId: 10, label: '기타 마스크' },
    ],
  },
  {
    categoryLabel: '클렌징',
    subcategories: [
      { subCategoryId: 11, label: '클렌징 폼' },
      { subCategoryId: 12, label: '클렌징 오일' },
      { subCategoryId: 13, label: '클렌징 밤' },
      { subCategoryId: 14, label: '클렌징 워터/밀크' },
      { subCategoryId: 15, label: '필링/스크럽' },
    ],
  },
  {
    categoryLabel: '선케어',
    subcategories: [
      { subCategoryId: 16, label: '선크림' },
      { subCategoryId: 17, label: '선앰플' },
    ],
  },
  {
    categoryLabel: '베이스 메이크업',
    subcategories: [
      { subCategoryId: 18, label: '메이크업 베이스' },
      { subCategoryId: 19, label: '쿠션' },
      { subCategoryId: 20, label: '파운데이션' },
    ],
  },
];
