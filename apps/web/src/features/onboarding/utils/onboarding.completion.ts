import type { OnboardingDraft } from '../types/onboarding.types';

export const ONBOARDING_COMPLETE_LOCATION_STATE = {
  onboardingCompleted: true,
} as const;

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
