import { Modal } from '@/shared/components';

interface OnboardingExitDialogProps {
  isOpen: boolean;
  onCancel: () => void;
  onExit: () => void;
}

export const OnboardingExitDialog = ({
  isOpen,
  onCancel,
  onExit,
}: OnboardingExitDialogProps) => (
  <Modal
    isOpen={isOpen}
    onClose={onCancel}
    title="회원가입을 종료하시겠습니까?"
    description="입력한 정보가 모두 삭제됩니다."
    leftButton={{
      label: '취소',
      onClick: onCancel,
    }}
    rightButton={{
      label: '종료',
      onClick: onExit,
    }}
  />
);
