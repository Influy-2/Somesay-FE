import type {
  RecommendedFilterGroupType,
  SelectedFiltersType,
} from './filter.types';

export const FILTER_CATEGORIES: {
  category: RecommendedFilterGroupType;
  label: string;
}[] = [
  { category: 'skinConcern', label: '피부 고민' },
  { category: 'skinType', label: '피부 타입' },
  { category: 'category', label: '카테고리' },
];
export const INITIAL_FILTERS: SelectedFiltersType = {
  skinConcern: [],
  skinType: [],
  category: [],
};

// TODO: 피부 고민/피부 타입 선택지 API가 생기면 백엔드 응답값으로 교체
export const SKIN_CONCERN_OPTIONS = [
  '보습',
  '속건조',
  '진정',
  '여드름',
  '붉은기',
  '미백/잡티',
  '주름/탄력',
  '모공',
  '피부결',
  '각질',
  '피부 장벽',
  '흔적',
];

export const SKIN_TYPE_OPTIONS = [
  '건성',
  '지성',
  '복합성',
  '수부지',
  '민감성',
  '여드름성',
  '모르겠음',
];

export const MAX_SELECTIONS: Record<RecommendedFilterGroupType, number> = {
  skinConcern: 2,
  skinType: 1,
  category: 1,
};
