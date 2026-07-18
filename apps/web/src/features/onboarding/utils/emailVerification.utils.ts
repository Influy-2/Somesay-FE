import {
  EMAIL_VERIFICATION_CODE_LENGTH,
  EMAIL_VERIFICATION_MAX_ATTEMPTS,
  MOCK_EMAIL_VERIFICATION_CODE,
} from '../constants/onboarding.constants';

export const VERIFICATION_ERROR_MESSAGES = {
  mismatch: '인증번호가 일치하지 않습니다.',
  expired: '인증번호가 만료되었습니다. 재전송해주세요.',
  attemptsExceeded: '인증번호 입력 시도 5회를 초과하였습니다. 재전송해 주세요.',
} as const;

export const formatVerificationTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(
    remainingSeconds
  ).padStart(2, '0')}`;
};

export const normalizeVerificationCode = (value: string) =>
  value.replace(/\D/g, '').slice(0, EMAIL_VERIFICATION_CODE_LENGTH);

export const getVerificationFailureMessage = (attemptCount: number) =>
  attemptCount >= EMAIL_VERIFICATION_MAX_ATTEMPTS
    ? VERIFICATION_ERROR_MESSAGES.attemptsExceeded
    : VERIFICATION_ERROR_MESSAGES.mismatch;

export const isVerificationCodeCorrect = (code: string) =>
  code === MOCK_EMAIL_VERIFICATION_CODE;
