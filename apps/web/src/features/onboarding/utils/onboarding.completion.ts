import type { OnboardingDraft } from '../types/onboarding.types';

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
