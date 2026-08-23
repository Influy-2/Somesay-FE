export type BottomSheetSize = 'large' | 'medium' | 'small' | 'compact';

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  ariaLabel?: string;
  size?: BottomSheetSize;
}

export interface DragState {
  isDragging: boolean;
  startY: number;
  startTime: number;
  currentY: number;
}
