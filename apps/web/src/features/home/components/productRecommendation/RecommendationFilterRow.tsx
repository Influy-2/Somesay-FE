import type { RecommendedFilterGroupType } from './filter.types';
import { TypeRow } from './TypeRow';
import { useGuestPreviewChips } from './useGuestPreviewChips';

const EMPTY_CATEGORY_OPTIONS: string[] = [];

interface RecommendationFilterRowProps {
  category: RecommendedFilterGroupType;
  label: string;
  selectedFilters: string[];
  categoryOptions?: string[];
  onPress: (category: RecommendedFilterGroupType) => void;
}

export const RecommendationFilterRow = ({
  category,
  label,
  selectedFilters,
  categoryOptions = EMPTY_CATEGORY_OPTIONS,
  onPress,
}: RecommendationFilterRowProps) => {
  const isPreviewEnabled = selectedFilters.length === 0;
  const previewChips = useGuestPreviewChips({
    category,
    isEnabled: isPreviewEnabled,
    categoryOptions,
  });

  return (
    <TypeRow
      rowTitle={label}
      selectedFilters={selectedFilters}
      previewChips={isPreviewEnabled ? previewChips : []}
      onPress={() => onPress(category)}
    />
  );
};
