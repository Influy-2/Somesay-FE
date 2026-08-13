import type { ChipLargeColor } from './ChipLarge';

// 여러 칩을 나란히 놓을 때 순서대로 적용하는 파스텔 팔레트입니다. (피그마 홈 히어로)
export const CHIP_PASTEL_COLORS: ChipLargeColor[] = [
  'blue200',
  'yellow100',
  'blue100',
  'yellow200',
  'gray02',
];

// 행이 바뀌어도 색 순서가 이어지도록 누적 인덱스로 색을 고릅니다.
export const getPastelChipColor = (index: number): ChipLargeColor =>
  CHIP_PASTEL_COLORS[index % CHIP_PASTEL_COLORS.length] ?? 'gray02';
