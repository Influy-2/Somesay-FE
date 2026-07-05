import { describe, expect, it } from 'vitest';
import {
  VERIFICATION_ERROR_MESSAGES,
  formatVerificationTime,
  getVerificationFailureMessage,
  isVerificationCodeCorrect,
  normalizeVerificationCode,
} from './emailVerification.utils';

describe('email verification utils', () => {
  it('인증번호를 숫자 6자리로 정규화한다', () => {
    expect(normalizeVerificationCode('12a34-567')).toBe('123456');
  });

  it('남은 시간을 mm:ss 형식으로 표시한다', () => {
    expect(formatVerificationTime(300)).toBe('05:00');
    expect(formatVerificationTime(299)).toBe('04:59');
    expect(formatVerificationTime(0)).toBe('00:00');
  });

  it('다섯 번째 실패부터 재전송 안내를 표시한다', () => {
    expect(getVerificationFailureMessage(4)).toBe(
      VERIFICATION_ERROR_MESSAGES.mismatch
    );
    expect(getVerificationFailureMessage(5)).toBe(
      VERIFICATION_ERROR_MESSAGES.attemptsExceeded
    );
  });

  it('개발용 인증번호 123456을 검증한다', () => {
    expect(isVerificationCodeCorrect('123456')).toBe(true);
    expect(isVerificationCodeCorrect('654321')).toBe(false);
  });
});
