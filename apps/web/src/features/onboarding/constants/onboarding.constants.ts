import type {
  OnboardingDraft,
  OnboardingGender,
  OnboardingStep,
} from '../types/onboarding.types';

//sessionStorage에 온보딩 상태를 저장할 때 사용하는 key입니다.
export const ONBOARDING_STORAGE_KEY = 'somesay-onboarding';

export const EMAIL_VERIFICATION_CODE_LENGTH = 6;
export const EMAIL_VERIFICATION_DURATION_SECONDS = 5 * 60;
export const EMAIL_VERIFICATION_MAX_ATTEMPTS = 5;
export const MOCK_EMAIL_VERIFICATION_CODE = '123456';

export const ONBOARDING_AGREEMENTS = [
  {
    id: 'TERMS_OF_SERVICE',
    label: '(필수) 서비스 이용약관 동의',
    required: true,
  },
  {
    id: 'PRIVACY_POLICY',
    label: '(필수) 개인정보 수집 및 이용 동의',
    required: true,
  },
] as const;

export const REQUIRED_AGREEMENT_IDS = ONBOARDING_AGREEMENTS.filter(
  (agreement) => agreement.required
).map((agreement) => agreement.id);
// 전체 온보딩 순서입니다.
export const ONBOARDING_STEP_ORDER: OnboardingStep[] = [
  'terms',
  'email',
  'emailVerification',
  'nickname',
  'profile',
  'skinTypes',
  'skinConcerns',
  'matchedProducts',
  'mismatchedProducts',
  'complete',
];

export const ONBOARDING_PROGRESS_STEPS = [
  'nickname',
  'profile',
  'skinTypes',
  'skinConcerns',
  'matchedProducts',
  'mismatchedProducts',
] as const satisfies readonly OnboardingStep[];

export const ONBOARDING_PROGRESS_STEP_COUNT = ONBOARDING_PROGRESS_STEPS.length;

export type OnboardingProgressStep = (typeof ONBOARDING_PROGRESS_STEPS)[number];

export const ONBOARDING_STEP_LABELS: Record<OnboardingStep, string> = {
  terms: '약관 동의',
  email: '이메일 입력',
  emailVerification: '이메일 인증',
  nickname: '닉네임',
  profile: '성별 및 연령대',
  skinTypes: '피부 타입',
  skinConcerns: '피부 고민',
  matchedProducts: '잘 맞았던 제품',
  mismatchedProducts: '안 맞았던 제품',
  complete: '가입 완료',
};

export const OPTIONAL_ONBOARDING_STEPS: OnboardingStep[] = [
  'skinConcerns',
  'matchedProducts',
  'mismatchedProducts',
];

export const GENDER_LABELS: Record<OnboardingGender, string> = {
  MALE: '남성',
  FEMALE: '여성',
  NONE: '해당없음',
};

export const INITIAL_ONBOARDING_DRAFT: OnboardingDraft = {
  provider: null,
  agreements: {},
  email: '',
  emailVerified: false,
  nickname: '',
  gender: null,
  age: null,
  skinTypeNames: [],
  concerns: [],
  matchedProductIds: [],
  mismatchedProductIds: [],
  completedSteps: [],
};
