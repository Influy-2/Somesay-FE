import { FILTER_CATEGORIES, MAX_SELECTIONS } from './filter.constants';
import {
  BottomSheet,
  FilterChip,
  ResetButton,
  FilterGroupTab,
  CTAButton,
} from '@/shared/components';
import type {
  RecommendedFilterGroupType,
  SelectedFiltersType,
} from './filter.types';
import { type CategoryGroupType, type SubcategoryType } from '@somesay/shared';
import { useFetchCategories } from '@/shared/hooks';

const ALL_SUBCATEGORY_OPTION: SubcategoryType = {
  subCategoryId: 0,
  subName: '전체',
};

// TODO: 피부 고민 선택지 API가 생기면 백엔드 응답값으로 교체
const SKIN_CONCERN_OPTIONS = [
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

// TODO: 피부 타입 선택지 API가 생기면 백엔드 응답값으로 교체
const SKIN_TYPE_OPTIONS = [
  '건성',
  '지성',
  '복합성',
  '수부지',
  '민감성',
  '여드름성',
  '모르겠음',
];

interface FilterBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFilters: SelectedFiltersType;
  setSelectedFilters: React.Dispatch<React.SetStateAction<SelectedFiltersType>>;
  activeCategory: RecommendedFilterGroupType;
  onCategoryChange: (category: RecommendedFilterGroupType) => void; // setter와 시그니처 일치
  onSubmit: () => void;
  onReset: () => void;
  isSubmitEnabled: boolean;
}

type FilterItem = string | SubcategoryType;

const getItemId = (v: FilterItem): string | number => {
  if (typeof v === 'string') return v;
  return v.subCategoryId;
};

export const FilterBottomSheet = ({
  isOpen,
  onClose,
  selectedFilters,
  setSelectedFilters,
  activeCategory,
  onCategoryChange,
  onSubmit,
  onReset,
  isSubmitEnabled,
}: FilterBottomSheetProps) => {
  const { data: categoryGroups = [] } = useFetchCategories();

  const handleToggleFilter = (item: FilterItem) => {
    const itemId = getItemId(item);
    setSelectedFilters((prev) => {
      const current = prev[activeCategory];
      const exists = current.some((v) => getItemId(v) === itemId);
      const max = MAX_SELECTIONS[activeCategory];

      if (exists) {
        return {
          ...prev,
          [activeCategory]: current.filter((v) => getItemId(v) !== itemId),
        };
      }
      if (max === 1) {
        return { ...prev, [activeCategory]: [item] };
      }
      if (current.length >= max) {
        return prev;
      }
      return { ...prev, [activeCategory]: [...current, item] };
    });
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel="제품 옵션 선택 필터"
      header={
        <FilterGroupTab
          categories={FILTER_CATEGORIES}
          activeCategory={activeCategory}
          onCategoryChange={onCategoryChange}
        />
      }
      footer={
        <div className="border-grey02 flex w-full shrink-0 flex-col items-center justify-center border-t bg-white px-4 pt-2 pb-[1.875rem]">
          <div className="flex w-full items-start gap-2">
            <ResetButton onClick={onReset} />
            <CTAButton
              label="제품 추천받기"
              onClick={onSubmit}
              disabled={!isSubmitEnabled}
            />
          </div>
        </div>
      }
    >
      {/* 콘텐츠 영역 */}
      <div className="mt-5 flex w-full flex-1 flex-col items-start gap-5 overflow-y-visible pb-[3.3125rem]">
        {/* 옵션 선택 영역 */}
        {activeCategory === 'skinConcern' && (
          <div className="flex flex-col items-start gap-3 px-4">
            <p className="body2-m text-grey06">
              최대 {MAX_SELECTIONS.skinConcern}개 선택
            </p>
            <div
              className="flex flex-wrap content-start items-start gap-x-2 gap-y-3 self-stretch"
              role="group"
              aria-label="피부 고민 선택"
            >
              {SKIN_CONCERN_OPTIONS.map((filter) => (
                <FilterChip
                  key={filter}
                  label={filter}
                  isSelected={selectedFilters.skinConcern.includes(filter)}
                  onClick={() => handleToggleFilter(filter)}
                />
              ))}
            </div>
          </div>
        )}
        {activeCategory === 'skinType' && (
          <div className="flex flex-col items-start gap-3 px-4">
            <p className="body2-m text-grey06">
              최대 {MAX_SELECTIONS.skinType}개 선택
            </p>
            <div
              className="flex flex-wrap content-start items-start gap-x-2 gap-y-3 self-stretch"
              role="group"
              aria-label="피부 타입 선택"
            >
              {SKIN_TYPE_OPTIONS.map((filter) => (
                <FilterChip
                  key={filter}
                  label={filter}
                  isSelected={selectedFilters.skinType.includes(filter)}
                  onClick={() => handleToggleFilter(filter)}
                />
              ))}
            </div>
          </div>
        )}
        {activeCategory === 'category' && (
          <div className="flex flex-col items-start gap-3 px-4">
            <p className="body2-m text-grey06">
              최대 {MAX_SELECTIONS.category}개 선택
            </p>
            <div
              className="flex flex-wrap content-start items-start gap-y-8 self-stretch"
              role="group"
              aria-label="카테고리 선택"
            >
              {/* 전체 */}
              <FilterChip
                key={ALL_SUBCATEGORY_OPTION.subCategoryId}
                label={ALL_SUBCATEGORY_OPTION.subName}
                isSelected={selectedFilters.category.some(
                  (f) =>
                    f.subCategoryId === ALL_SUBCATEGORY_OPTION.subCategoryId
                )}
                onClick={() => handleToggleFilter(ALL_SUBCATEGORY_OPTION)}
              />

              {/* 스킨케어, 마스크/팩, 클렌징 등 카테고리 그룹과 하위 카테고리를 맵핑하여 렌더링 */}
              {categoryGroups.map((group: CategoryGroupType) => (
                <div
                  className="flex w-full flex-col items-start gap-3 self-stretch"
                  key={group.mainCategoryId}
                >
                  <p className="body2-sb text-black">{group.mainName}</p>
                  <div className="flex flex-wrap content-start items-start gap-x-2 gap-y-3 self-stretch">
                    {group.subCategories.map((filter) => (
                      <FilterChip
                        key={filter.subCategoryId}
                        label={filter.subName}
                        isSelected={selectedFilters.category.some(
                          (selected) =>
                            selected.subCategoryId === filter.subCategoryId
                        )}
                        onClick={() => handleToggleFilter(filter)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </BottomSheet>
  );
};
