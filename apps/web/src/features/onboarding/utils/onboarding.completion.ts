import type { OnboardingDraft } from '../types/onboarding.types';
import { ONBOARDING_PATH_BY_STEP } from './onboarding.flow';

export const ONBOARDING_COMPLETE_LOCATION_STATE = {
  onboardingCompleted: true,
} as const;

type OnboardingCompleteNavigate = (
  path: string,
  options: {
    replace: true;
    state: typeof ONBOARDING_COMPLETE_LOCATION_STATE;
    flushSync: true;
  }
) => unknown;

// 현재 온보딩 guard가 완료 이동을 가로채지 않도록 경로를 동기적으로 확정합니다.
export const finalizeOnboarding = (navigate: OnboardingCompleteNavigate) => {
  navigate(ONBOARDING_PATH_BY_STEP.complete, {
    replace: true,
    state: ONBOARDING_COMPLETE_LOCATION_STATE,
    flushSync: true,
  });
};

type OnboardingCompleteNavigationType = 'POP' | 'PUSH' | 'REPLACE';

export const isOnboardingCompleteEntry = (
  state: unknown,
  navigationType: OnboardingCompleteNavigationType
) =>
  navigationType === 'REPLACE' &&
  typeof state === 'object' &&
  state !== null &&
  'onboardingCompleted' in state &&
  state.onboardingCompleted === true;

type RequiredOnboardingInfo = Pick<
  OnboardingDraft,
  'nickname' | 'gender' | 'age' | 'skinTypeNames'
>;

export const isOnboardingCompletionAvailable = ({
  nickname,
  gender,
  age,
  skinTypeNames,
}: RequiredOnboardingInfo) =>
  nickname.trim().length > 0 &&
  gender !== null &&
  age !== null &&
  skinTypeNames.length > 0;
