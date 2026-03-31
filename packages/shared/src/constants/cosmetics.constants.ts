import type {
  SkinTypeOption,
  SkinConcernOption,
  SubcategoryGroup,
  CategoryType,
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
  { skinConcernId: 11, label: '피부 장벽' },
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

export const CATEGORIES: CategoryType[] = [
  { categoryId: 1, categoryLabel: '전체' },
  { categoryId: 2, categoryLabel: '클렌징/필링' },
  { categoryId: 3, categoryLabel: '마스크/팩' },
  { categoryId: 4, categoryLabel: '선케어' },
  { categoryId: 5, categoryLabel: '베이스' },
];

// ⚠️ categoryId, subCategoryId는 백엔드 API 응답값으로 교체 필요
export const CATEGORY_GROUPS: SubcategoryGroup[] = [
  {
    categoryId: 1,
    categoryLabel: '스킨케어',
    subcategories: [
      { subCategoryId: 101, label: '스킨/토너' },
      { subCategoryId: 102, label: '로션/에멀전' },
      { subCategoryId: 103, label: '에센스/앰플/세럼' },
      { subCategoryId: 104, label: '크림' },
      { subCategoryId: 105, label: '미스트/오일' },
    ],
  },
  {
    categoryId: 2,
    categoryLabel: '마스크/팩',
    subcategories: [
      { subCategoryId: 201, label: '시트 마스크' },
      { subCategoryId: 202, label: '스킨/토너 패드' },
      { subCategoryId: 203, label: '코팩' },
      { subCategoryId: 204, label: '기타 마스크' },
    ],
  },
  {
    categoryId: 3,
    categoryLabel: '클렌징',
    subcategories: [
      { subCategoryId: 301, label: '클렌징 폼' },
      { subCategoryId: 302, label: '클렌징 오일' },
      { subCategoryId: 303, label: '클렌징 밤' },
      { subCategoryId: 304, label: '클렌징 워터/밀크' },
      { subCategoryId: 305, label: '필링/스크럽' },
    ],
  },
  {
    categoryId: 4,
    categoryLabel: '선케어',
    subcategories: [
      { subCategoryId: 401, label: '선크림' },
      { subCategoryId: 402, label: '선앰플' },
    ],
  },
  {
    categoryId: 5,
    categoryLabel: '베이스 메이크업',
    subcategories: [
      { subCategoryId: 501, label: '메이크업 베이스' },
      { subCategoryId: 502, label: '쿠션' },
      { subCategoryId: 503, label: '파운데이션' },
    ],
  },
];
