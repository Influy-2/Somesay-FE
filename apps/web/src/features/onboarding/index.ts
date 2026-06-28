export { OnboardingLayout } from './components/OnboardingLayout';
export {
  OnboardingIndexRedirect,
  OnboardingRouteGuard,
} from './components/OnboardingRouteGuard';
export {
  AGE_LABELS,
  GENDER_LABELS,
  ONBOARDING_STEP_LABELS,
  OPTIONAL_ONBOARDING_STEPS,
  REQUIRED_AGREEMENT_IDS,
} from './constants/onboarding.constants';
export { useOnboardingStore } from './store/onboarding.store';
export type {
  OnboardingAge,
  OnboardingDraft,
  OnboardingGender,
  OnboardingStep,
  ProductFitStatus,
} from './types/onboarding.types';
export {
  agreementsSchema,
  concernsSchema,
  emailSchema,
  nicknameSchema,
  onboardingAgeSchema,
  onboardingGenderSchema,
  onboardingStepSchema,
  onboardingStepSchemas,
  productFitPayloadSchema,
  productFitStatusSchema,
  productIdsSchema,
  signupPayloadSchema,
  skinTypeNamesSchema,
} from './schemas/onboarding.schema';
export type {
  ProductFitPayload,
  SignupPayload,
} from './schemas/onboarding.schema';
export {
  getFirstIncompleteStep,
  getNextOnboardingPath,
  getOnboardingEntryPath,
  getOnboardingRedirectPath,
  getOnboardingSteps,
  isOnboardingStepComplete,
  ONBOARDING_PATH_BY_STEP,
} from './utils/onboarding.flow';
export {
  buildProductFitPayloads,
  buildSignupPayload,
} from './utils/onboarding.mapper';
