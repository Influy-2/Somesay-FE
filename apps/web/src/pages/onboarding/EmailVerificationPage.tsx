import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  getNextOnboardingPath,
  OnboardingLayout,
  useEmailVerification,
  useOnboardingStore,
} from '@/features/onboarding';
import { VerificationCodeInput } from '@/shared/components';
import { CheckOnIcon } from '@/shared/icons';
import { useSnackbarStore } from '@/shared/stores/snackbar.store';

const VERIFICATION_SUCCESS_DELAY_MS = 1000;

export const EmailVerificationPage = () => {
  const navigate = useNavigate();
  const email = useOnboardingStore((state) => state.email);
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const successTimerRef = useRef<number | null>(null);

  const handleVerified = useCallback(() => {
    const store = useOnboardingStore.getState();
    store.markEmailVerified();
    store.markStepComplete('emailVerification');

    setIsSuccessVisible(true);
    successTimerRef.current = window.setTimeout(() => {
      navigate(getNextOnboardingPath('emailVerification'));
    }, VERIFICATION_SUCCESS_DELAY_MS);
  }, [navigate]);

  useEffect(
    () => () => {
      if (successTimerRef.current) {
        window.clearTimeout(successTimerRef.current);
      }
    },
    []
  );

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
  } = useEmailVerification({ onVerified: handleVerified, autoVerify: false });

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

        <VerificationCodeInput
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

      {isSuccessVisible && (
        <div
          className="z-overlay fixed top-13.5 bottom-0 left-1/2 flex w-full max-w-110 min-w-[20rem] -translate-x-1/2 items-center justify-center bg-white"
          role="status"
          aria-live="polite"
        >
          <div className="flex -translate-y-8 flex-col items-center gap-4.5">
            <CheckOnIcon className="size-16" aria-hidden="true" />
            <p className="headline1 text-grey-black">인증 성공!</p>
          </div>
        </div>
      )}
    </OnboardingLayout>
  );
};
