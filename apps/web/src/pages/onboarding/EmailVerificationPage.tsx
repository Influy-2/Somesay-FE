import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import {
  getNextOnboardingPath,
  OnboardingLayout,
  useEmailVerification,
  useOnboardingStore,
} from '@/features/onboarding';
import { PATH } from '@/routes/path';
import { OnboardingVerificationCodeInput } from '@/shared/components';
import { useSnackbarStore } from '@/shared/stores/snackbar.store';

export const EmailVerificationPage = () => {
  const navigate = useNavigate();
  const email = useOnboardingStore((state) => state.email);
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

  const handleVerified = useCallback(() => {
    const store = useOnboardingStore.getState();
    if (!store.provider) {
      navigate(PATH.LOGIN.BASE, { replace: true });
      return;
    }

    store.markEmailVerified();
    store.markStepComplete('emailVerification');
    navigate(getNextOnboardingPath(store.provider, 'emailVerification'));
  }, [navigate]);

  const {
    code,
    timerText,
    errorMessage,
    isExpired,
    isAttemptLimitReached,
    canSubmit,
    handleCodeChange,
    verifyCode,
    resend,
    timerGeneration,
  } = useEmailVerification({ onVerified: handleVerified });

  const handleResend = () => {
    resend();
    showSnackbar('인증번호가 재전송되었습니다.', {
      placement: 'onboardingBottom48',
    });
  };

  return (
    <OnboardingLayout
      headerVariant="signup"
      footerContent={
        <div className="flex justify-center bg-white pt-2">
          <button
            type="button"
            onClick={handleResend}
            className="body2-sb cursor-pointer underline"
          >
            인증번호 재전송
          </button>
        </div>
      }
      cta={{
        label: '다음',
        onClick: () => verifyCode(code),
        disabled: !canSubmit,
        showPrevious: false,
      }}
    >
      <div className="flex flex-col gap-7 pt-3.5">
        <h1 className="headline4">
          {email}로
          <br />
          인증번호를 보내드렸습니다
        </h1>

        <OnboardingVerificationCodeInput
          key={timerGeneration}
          value={code}
          onChange={(event) => handleCodeChange(event.target.value)}
          timerText={timerText}
          isExpired={isExpired}
          disabled={isExpired || isAttemptLimitReached}
          autoComplete="one-time-code"
          {...(errorMessage ? { errorMessage } : {})}
          autoFocus
        />
      </div>
    </OnboardingLayout>
  );
};
