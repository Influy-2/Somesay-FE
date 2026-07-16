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
    <BottomSheet isOpen={isOpen} onClose={onClose} ariaLabel="">
      <>d임시</>
    </BottomSheet>
  );
};
