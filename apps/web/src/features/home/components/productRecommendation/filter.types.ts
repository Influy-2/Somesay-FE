import type { FilterGroupType } from '@somesay/shared';

// 추천 조건 타입은 shared가 소유합니다. 여기서는 재노출만 합니다.
export type { SelectedFiltersType } from '@somesay/shared';

export type RecommendedFilterGroupType = Exclude<FilterGroupType, 'effect'>;
