import { BottomSheet } from '@/shared/components';
interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}
export const OnboardingCompleteBottomSheet = ({
  isOpen,
  onClose,
}: BottomSheetProps) => {
  return (
    <BottomSheet
      data-feature="F-0172"
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel=""
    >
      <>d임시</>
    </BottomSheet>
  );
};
