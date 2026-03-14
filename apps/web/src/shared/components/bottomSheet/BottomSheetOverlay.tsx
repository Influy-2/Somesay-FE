interface BottomSheetOverlayProps {
  isOpen: boolean;
  onClick: () => void;
}

export const BottomSheetOverlay = ({
  isOpen,
  onClick,
}: BottomSheetOverlayProps) => {
  return (
    <div
      className={`fixed inset-0 left-1/2 z-40 w-full max-w-110 -translate-x-1/2 bg-black transition-opacity duration-300 ease-out ${isOpen ? 'pointer-events-auto opacity-40' : 'pointer-events-none opacity-0'} `}
      onClick={onClick}
      aria-hidden="true"
    />
  );
};
