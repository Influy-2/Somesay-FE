import { useEffect, useRef, useState } from 'react';
import type { ChipLargeColor } from '@/shared/components';
import { SKIN_CONCERN_OPTIONS, SKIN_TYPE_OPTIONS } from './filter.constants';
import type { RecommendedFilterGroupType } from './filter.types';

const PREVIEW_CHANGE_INTERVAL_MS = 2000;
const FALLBACK_CATEGORY_OPTIONS = ['크림', '클렌징 폼', '선앰플'];
const CHIP_COLORS: ChipLargeColor[] = [
  'blue300',
  'blue200',
  'blue100',
  'yellow100',
  'yellow200',
  'gray02',
];

export interface GuestPreviewChip {
  id: string;
  label: string;
  color: ChipLargeColor;
}

interface UseGuestPreviewChipsParams {
  category: RecommendedFilterGroupType;
  isEnabled: boolean;
  categoryOptions?: string[];
}

const getRandomItem = <T>(items: T[]): T =>
  items[Math.floor(Math.random() * items.length)] as T;

const getRandomUniqueItems = <T>(items: T[], count: number): T[] =>
  [...items].sort(() => Math.random() - 0.5).slice(0, count);

const createPreviewChip = (
  category: RecommendedFilterGroupType,
  label: string,
  cycle: number,
  index: number
): GuestPreviewChip => ({
  id: `${category}-${cycle}-${index}`,
  label,
  color: getRandomItem(CHIP_COLORS),
});

const createPreviewChips = (
  category: RecommendedFilterGroupType,
  categoryOptions: string[],
  cycle: number
): GuestPreviewChip[] => {
  const categories =
    categoryOptions.length > 0 ? categoryOptions : FALLBACK_CATEGORY_OPTIONS;

  if (category === 'skinConcern') {
    return getRandomUniqueItems(SKIN_CONCERN_OPTIONS, 2).map((label, index) =>
      createPreviewChip(category, label, cycle, index)
    );
  }

  const options = category === 'skinType' ? SKIN_TYPE_OPTIONS : categories;

  return [createPreviewChip(category, getRandomItem(options), cycle, 0)];
};

export const useGuestPreviewChips = ({
  category,
  isEnabled,
  categoryOptions = [],
}: UseGuestPreviewChipsParams) => {
  const cycleRef = useRef(0);
  const [previewChips, setPreviewChips] = useState(() =>
    createPreviewChips(category, categoryOptions, 0)
  );

  useEffect(() => {
    if (!isEnabled) return;

    const intervalId = window.setInterval(() => {
      cycleRef.current += 1;
      setPreviewChips(
        createPreviewChips(category, categoryOptions, cycleRef.current)
      );
    }, PREVIEW_CHANGE_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [category, categoryOptions, isEnabled]);

  return previewChips;
};
