export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  ariaLabel?: string;
  height?: string; // Tailwind height class (예: 'h-[60vh]')
}

export interface DragState {
  isDragging: boolean;
  startY: number;
  startTime: number;
  currentY: number;
}
