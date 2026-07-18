import { describe, expect, it, vi } from 'vitest';
import { PATH } from '@/routes/path';
import {
  INITIAL_ONBOARDING_DRAFT,
  ONBOARDING_PROGRESS_STEP_COUNT,
  ONBOARDING_PROGRESS_STEPS,
  REQUIRED_AGREEMENT_IDS,
} from '../constants/onboarding.constants';
import type { OnboardingDraft } from '../types/onboarding.types';
import type { OnboardingStep } from '../types/onboarding.types';
import {
  getFirstIncompleteStep,
  getNextOnboardingPath,
  getOnboardingRedirectPath,
  getOnboardingSteps,
  ONBOARDING_PATH_BY_STEP,
} from './onboarding.flow';
import {
  finalizeOnboarding,
  isOnboardingCompleteEntry,
  isOnboardingCompletionAvailable,
  ONBOARDING_COMPLETE_LOCATION_STATE,
} from './onboarding.completion';

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

const createEmailVerifiedDraft = (
  provider: OnboardingDraft['provider']
): OnboardingDraft => ({
  ...createTermsCompletedDraft(provider),
  email: 'somesay@example.com',
  emailVerified: true,
  completedSteps: ['terms', 'email', 'emailVerification'],
});

const completeRequiredInfo = {
  nickname: 'somesay',
  gender: 'NONE',
  age: 'TWENTIES',
  skinTypeNames: ['건성'],
} satisfies Pick<
  OnboardingDraft,
  'nickname' | 'gender' | 'age' | 'skinTypeNames'
>;

describe('onboarding flow', () => {
  it('온보딩 guard가 가로채기 전에 완료 경로를 동기적으로 확정한다', () => {
    const navigate = vi.fn();

    finalizeOnboarding(navigate);

    expect(navigate).toHaveBeenCalledWith(ONBOARDING_PATH_BY_STEP.complete, {
      replace: true,
      state: ONBOARDING_COMPLETE_LOCATION_STATE,
      flushSync: true,
    });
  });

  it('정상 회원가입 완료 이동인 경우에만 완료 화면 진입을 허용한다', () => {
    expect(
      isOnboardingCompleteEntry(ONBOARDING_COMPLETE_LOCATION_STATE, 'REPLACE')
    ).toBe(true);
    expect(
      isOnboardingCompleteEntry(ONBOARDING_COMPLETE_LOCATION_STATE, 'POP')
    ).toBe(false);
    expect(isOnboardingCompleteEntry(null, 'REPLACE')).toBe(false);
  });

  it('프로필 입력 진행률은 닉네임부터 안 맞았던 제품까지 6단계다', () => {
    expect(ONBOARDING_PROGRESS_STEPS).toEqual([
      'nickname',
      'profile',
      'skinTypes',
      'skinConcerns',
      'matchedProducts',
      'mismatchedProducts',
    ]);
    expect(ONBOARDING_PROGRESS_STEP_COUNT).toBe(6);
  });

  it('필수 기본 정보가 모두 입력되면 X 버튼으로 회원가입을 완료할 수 있다', () => {
    expect(isOnboardingCompletionAvailable(completeRequiredInfo)).toBe(true);
  });

  it.each([
    { ...completeRequiredInfo, nickname: '' },
    { ...completeRequiredInfo, gender: null },
    { ...completeRequiredInfo, age: null },
    { ...completeRequiredInfo, skinTypeNames: [] },
  ])(
    '필수 기본 정보 중 하나라도 비어 있으면 완료할 수 없다',
    (requiredInfo) => {
      expect(isOnboardingCompletionAvailable(requiredInfo)).toBe(false);
    }
  );

  it('provider가 없으면 로그인으로 이동시킨다', () => {
    expect(getOnboardingRedirectPath(INITIAL_ONBOARDING_DRAFT, 'terms')).toBe(
      PATH.LOGIN.BASE
    );
  });

  it('카카오 신규 회원은 약관 다음에 이메일 입력과 인증을 진행한다', () => {
    const draft = createTermsCompletedDraft('KAKAO');

    expect(getOnboardingSteps()).toContain('email');
    expect(getOnboardingSteps()).toContain('emailVerification');
    expect(getNextOnboardingPath('terms')).toBe(ONBOARDING_PATH_BY_STEP.email);
    expect(getFirstIncompleteStep(draft)).toBe('email');
    expect(getOnboardingRedirectPath(draft, 'email')).toBe(null);
    expect(getOnboardingRedirectPath(draft, 'nickname')).toBe(
      ONBOARDING_PATH_BY_STEP.email
    );
  });

  it('이메일 인증을 마치면 닉네임 단계로 이동한다', () => {
    expect(getFirstIncompleteStep(createEmailVerifiedDraft('KAKAO'))).toBe(
      'nickname'
    );
  });

  it('선행 단계보다 앞선 단계는 다시 방문할 수 있다', () => {
    const draft = {
      ...createEmailVerifiedDraft('NAVER'),
      nickname: 'somesay',
      completedSteps: [
        'terms',
        'email',
        'emailVerification',
        'nickname',
      ] as OnboardingStep[],
    };

    expect(getOnboardingRedirectPath(draft, 'terms')).toBeNull();
    expect(getOnboardingRedirectPath(draft, 'skinTypes')).toBe(
      ONBOARDING_PATH_BY_STEP.profile
    );
  });

  it('복원된 데이터가 Zod 스키마에 맞지 않으면 해당 단계로 이동시킨다', () => {
    const draft: OnboardingDraft = {
      ...createEmailVerifiedDraft('NAVER'),
      nickname: 'somesay',
      gender: 'FEMALE',
      age: 'TWENTIES',
      skinTypeNames: ['건성', '지성', '복합성'],
      completedSteps: [
        'terms',
        'email',
        'emailVerification',
        'nickname',
        'profile',
        'skinTypes',
      ],
    };

    expect(getFirstIncompleteStep(draft)).toBe('skinTypes');
    expect(getOnboardingRedirectPath(draft, 'skinConcerns')).toBe(
      ONBOARDING_PATH_BY_STEP.skinTypes
    );
  });
});
