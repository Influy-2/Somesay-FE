interface BottomSheetHandleProps {
  onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: (e: React.TouchEvent<HTMLDivElement>) => void;
}

export const BottomSheetHandle = ({
  onTouchStart,
  onTouchEnd,
}: BottomSheetHandleProps) => {
  return (
    <div
      data-drag-handle
      className="flex w-full items-center justify-center pt-2 pb-4"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-label="바텀시트 핸들"
      role="presentation"
      id="bottom-sheet-handle"
    >
      <div className="bg-grey03 h-1 w-12 rounded-sm" />
    </div>
  );
};
