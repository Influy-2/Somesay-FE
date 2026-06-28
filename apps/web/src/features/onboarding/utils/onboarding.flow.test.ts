import { describe, expect, it } from 'vitest';
import { PATH } from '@/routes/path';
import {
  INITIAL_ONBOARDING_DRAFT,
  REQUIRED_AGREEMENT_IDS,
} from '../constants/onboarding.constants';
import type { OnboardingDraft } from '../types/onboarding.types';
import type { OnboardingStep } from '../types/onboarding.types';
import {
  getFirstIncompleteStep,
  getOnboardingRedirectPath,
  getOnboardingSteps,
  ONBOARDING_PATH_BY_STEP,
} from './onboarding.flow';

const createTermsCompletedDraft = (
  provider: OnboardingDraft['provider']
): OnboardingDraft => ({
  ...INITIAL_ONBOARDING_DRAFT,
  provider,
  agreements: Object.fromEntries(
    REQUIRED_AGREEMENT_IDS.map((agreementId) => [agreementId, true])
  ),
  completedSteps: ['terms'],
});

describe('onboarding flow', () => {
  it('provider가 없으면 로그인으로 이동시킨다', () => {
    expect(getOnboardingRedirectPath(INITIAL_ONBOARDING_DRAFT, 'terms')).toBe(
      PATH.LOGIN.BASE
    );
  });

  it('카카오는 이메일 입력과 인증 단계를 포함한다', () => {
    const draft = createTermsCompletedDraft('KAKAO');

    expect(getFirstIncompleteStep(draft)).toBe('email');
    expect(getOnboardingRedirectPath(draft, 'nickname')).toBe(
      ONBOARDING_PATH_BY_STEP.email
    );
  });

  it('네이버와 구글은 이메일 단계를 제외한다', () => {
    expect(getOnboardingSteps('NAVER')).not.toContain('email');
    expect(getOnboardingSteps('GOOGLE')).not.toContain('emailVerification');
    expect(getFirstIncompleteStep(createTermsCompletedDraft('GOOGLE'))).toBe(
      'nickname'
    );
  });

  it('선행 단계보다 앞선 단계는 다시 방문할 수 있다', () => {
    const draft = {
      ...createTermsCompletedDraft('NAVER'),
      nickname: 'somesay',
      completedSteps: ['terms', 'nickname'] as OnboardingStep[],
    };

    expect(getOnboardingRedirectPath(draft, 'terms')).toBeNull();
    expect(getOnboardingRedirectPath(draft, 'skinTypes')).toBe(
      ONBOARDING_PATH_BY_STEP.profile
    );
  });

  it('복원된 데이터가 Zod 스키마에 맞지 않으면 해당 단계로 이동시킨다', () => {
    const draft: OnboardingDraft = {
      ...createTermsCompletedDraft('NAVER'),
      nickname: 'somesay',
      gender: 'FEMALE',
      age: 'TWENTIES',
      skinTypeNames: ['건성', '지성', '복합성'],
      completedSteps: ['terms', 'nickname', 'profile', 'skinTypes'],
    };

    expect(getFirstIncompleteStep(draft)).toBe('skinTypes');
    expect(getOnboardingRedirectPath(draft, 'skinConcerns')).toBe(
      ONBOARDING_PATH_BY_STEP.skinTypes
    );
  });
});
