import { useCallback, useEffect, useRef, useState } from 'react';
import {
  EMAIL_VERIFICATION_CODE_LENGTH,
  EMAIL_VERIFICATION_DURATION_SECONDS,
  EMAIL_VERIFICATION_MAX_ATTEMPTS,
} from '../constants/onboarding.constants';
import {
  VERIFICATION_ERROR_MESSAGES,
  formatVerificationTime,
  getVerificationFailureMessage,
  isVerificationCodeCorrect,
  normalizeVerificationCode,
} from '../utils/emailVerification.utils';

interface UseEmailVerificationOptions {
  onVerified: () => void;
  autoVerify?: boolean;
}

export const useEmailVerification = ({
  onVerified,
  autoVerify = true,
}: UseEmailVerificationOptions) => {
  const [code, setCode] = useState('');
  const [remainingSeconds, setRemainingSeconds] = useState(
    EMAIL_VERIFICATION_DURATION_SECONDS
  );
  const [attemptCount, setAttemptCount] = useState(0);
  const [validationError, setValidationError] = useState<string>();
  const [timerGeneration, setTimerGeneration] = useState(0);
  const isVerifyingRef = useRef(false);

  const isExpired = remainingSeconds === 0;
  const isAttemptLimitReached = attemptCount >= EMAIL_VERIFICATION_MAX_ATTEMPTS;
  const errorMessage = isExpired
    ? VERIFICATION_ERROR_MESSAGES.expired
    : validationError;
  const canSubmit =
    code.length === EMAIL_VERIFICATION_CODE_LENGTH &&
    !errorMessage &&
    !isAttemptLimitReached;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemainingSeconds((currentSeconds) => {
        if (currentSeconds <= 1) {
          window.clearInterval(timer);
          return 0;
        }

        return currentSeconds - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [timerGeneration]);

  const verifyCode = useCallback(
    (verificationCode: string) => {
      if (
        verificationCode.length !== EMAIL_VERIFICATION_CODE_LENGTH ||
        isExpired ||
        isAttemptLimitReached ||
        isVerifyingRef.current
      ) {
        return;
      }

      isVerifyingRef.current = true;

      if (isVerificationCodeCorrect(verificationCode)) {
        onVerified();
        return;
      }

      const nextAttemptCount = attemptCount + 1;
      setAttemptCount(nextAttemptCount);
      setValidationError(getVerificationFailureMessage(nextAttemptCount));
      isVerifyingRef.current = false;
    },
    [attemptCount, isAttemptLimitReached, isExpired, onVerified]
  );

  useEffect(() => {
    if (
      !autoVerify ||
      code.length !== EMAIL_VERIFICATION_CODE_LENGTH ||
      validationError
    ) {
      return;
    }

    const autoVerification = window.setTimeout(() => verifyCode(code), 0);

    return () => window.clearTimeout(autoVerification);
  }, [autoVerify, code, validationError, verifyCode]);

  const handleCodeChange = useCallback(
    (value: string) => {
      if (isExpired || isAttemptLimitReached) return;

      const nextCode = normalizeVerificationCode(value);

      setCode(nextCode);
      setValidationError(undefined);
    },
    [isAttemptLimitReached, isExpired]
  );

  const resend = () => {
    setCode('');
    setAttemptCount(0);
    setValidationError(undefined);
    setRemainingSeconds(EMAIL_VERIFICATION_DURATION_SECONDS);
    setTimerGeneration((generation) => generation + 1);
    isVerifyingRef.current = false;
  };

  return {
    code,
    timerText: formatVerificationTime(remainingSeconds),
    errorMessage,
    isExpired,
    isAttemptLimitReached,
    canSubmit,
    handleCodeChange,
    verifyCode,
    resend,
    timerGeneration,
  };
};
