export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  height?: string; // Tailwind height class (예: 'h-[60vh]')
}

export interface DragState {
  isDragging: boolean;
  startY: number;
  startTime: number;
  currentY: number;
}
