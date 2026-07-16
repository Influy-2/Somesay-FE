import type { BottomSheetSize } from './bottomSheet.types';

export const BOTTOM_SHEET_HEIGHT: Record<BottomSheetSize, number> = {
  large: 600,
  medium: 516,
  small: 356,
  compact: 174,
};

export const EXPANDABLE_BOTTOM_SHEET_SIZES: ReadonlySet<BottomSheetSize> =
  new Set(['large', 'medium']);

export const BOTTOM_SHEET_TOP_GAP = 54;
