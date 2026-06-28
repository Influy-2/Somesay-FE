import { PATH } from '@/routes/path';
import { ONBOARDING_STEP_ORDER } from '../constants/onboarding.constants';
import {
  onboardingStepSchemas,
  socialProviderSchema,
} from '../schemas/onboarding.schema';
import type {
  OnboardingDraft,
  OnboardingStep,
  SocialProvider,
} from '../types/onboarding.types';

export const ONBOARDING_PATH_BY_STEP: Record<OnboardingStep, string> = {
  terms: `${PATH.ONBOARDING.BASE}/${PATH.ONBOARDING.TERMS}`,
  email: `${PATH.ONBOARDING.BASE}/${PATH.ONBOARDING.EMAIL}`,
  emailVerification: `${PATH.ONBOARDING.BASE}/${PATH.ONBOARDING.EMAIL_VERIFICATION}`,
  nickname: `${PATH.ONBOARDING.BASE}/${PATH.ONBOARDING.NICKNAME}`,
  profile: `${PATH.ONBOARDING.BASE}/${PATH.ONBOARDING.PROFILE}`,
  skinTypes: `${PATH.ONBOARDING.BASE}/${PATH.ONBOARDING.SKIN_TYPES}`,
  skinConcerns: `${PATH.ONBOARDING.BASE}/${PATH.ONBOARDING.SKIN_CONCERNS}`,
  matchedProducts: `${PATH.ONBOARDING.BASE}/${PATH.ONBOARDING.MATCHED_PRODUCTS}`,
  mismatchedProducts: `${PATH.ONBOARDING.BASE}/${PATH.ONBOARDING.MISMATCHED_PRODUCTS}`,
  complete: `${PATH.ONBOARDING.BASE}/${PATH.ONBOARDING.COMPLETE}`,
};

const EMAIL_STEPS: OnboardingStep[] = ['email', 'emailVerification'];

export const getOnboardingSteps = (
  provider: SocialProvider
): OnboardingStep[] =>
  provider === 'KAKAO'
    ? ONBOARDING_STEP_ORDER
    : ONBOARDING_STEP_ORDER.filter((step) => !EMAIL_STEPS.includes(step));

export const isOnboardingStepComplete = (
  draft: OnboardingDraft,
  step: OnboardingStep
) => {
  if (step === 'complete') return false;

  return onboardingStepSchemas[step].safeParse(draft).success;
};

export const getFirstIncompleteStep = (
  draft: OnboardingDraft
): OnboardingStep | null => {
  const providerResult = socialProviderSchema.safeParse(draft.provider);
  if (!providerResult.success) return null;

  const steps = getOnboardingSteps(providerResult.data);

  return (
    steps.find(
      (step) => step === 'complete' || !isOnboardingStepComplete(draft, step)
    ) ?? 'complete'
  );
};

//onboarding으로 들어왔을 때 이동해야 할 URL을 반환합니다.
export const getOnboardingEntryPath = (draft: OnboardingDraft) => {
  const firstIncompleteStep = getFirstIncompleteStep(draft);

  return firstIncompleteStep
    ? ONBOARDING_PATH_BY_STEP[firstIncompleteStep]
    : PATH.LOGIN.BASE;
};

//사용자가 특정 단계 URL에 접근할 수 있는지 판단합니다.
export const getOnboardingRedirectPath = (
  draft: OnboardingDraft,
  targetStep: OnboardingStep
): string | null => {
  const providerResult = socialProviderSchema.safeParse(draft.provider);
  if (!providerResult.success) return PATH.LOGIN.BASE;

  const steps = getOnboardingSteps(providerResult.data);
  const targetIndex = steps.indexOf(targetStep);
  const firstIncompleteStep = getFirstIncompleteStep(draft);

  if (targetIndex === -1 || !firstIncompleteStep) {
    return getOnboardingEntryPath(draft);
  }

  const firstIncompleteIndex = steps.indexOf(firstIncompleteStep);

  return targetIndex > firstIncompleteIndex
    ? ONBOARDING_PATH_BY_STEP[firstIncompleteStep]
    : null;
};

export const getNextOnboardingPath = (
  provider: SocialProvider,
  currentStep: OnboardingStep
) => {
  const steps = getOnboardingSteps(provider);
  const currentIndex = steps.indexOf(currentStep);
  const nextStep = steps[currentIndex + 1] ?? 'complete';

  return ONBOARDING_PATH_BY_STEP[nextStep];
};
