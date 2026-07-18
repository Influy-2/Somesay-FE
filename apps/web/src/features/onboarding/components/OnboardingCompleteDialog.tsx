import { Modal } from '@/shared/components';

interface OnboardingCompleteDialogProps {
  isOpen: boolean;
  isSubmitting?: boolean;
  onCancel: () => void;
  onComplete: () => void;
}

export const OnboardingCompleteDialog = ({
  isOpen,
  isSubmitting = false,
  onCancel,
  onComplete,
}: OnboardingCompleteDialogProps) => (
  <Modal
    isOpen={isOpen}
    onClose={isSubmitting ? () => undefined : onCancel}
    title="회원가입을 완료하시겠습니까?"
    description={
      <>
        기본 정보 입력이 끝났어요!
        <br />
        추가 정보는 마이페이지에서 언제든
        <br />
        채울 수 있어요.
      </>
    }
    leftButton={{
      label: '취소',
      onClick: onCancel,
      disabled: isSubmitting,
    }}
    rightButton={{
      label: '완료',
      onClick: onComplete,
      disabled: isSubmitting,
    }}
  />
);
