import type {
  OnboardingAge,
  OnboardingDraft,
  OnboardingGender,
  OnboardingStep,
  SocialProvider,
} from '../types/onboarding.types';

//sessionStorage에 온보딩 상태를 저장할 때 사용하는 key입니다.
export const ONBOARDING_STORAGE_KEY = 'somesay-onboarding';

export const REQUIRED_AGREEMENT_IDS = [
  'TERMS_OF_SERVICE',
  'PRIVACY_POLICY',
] as const;
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

export const SOCIAL_PROVIDER_LABELS: Record<SocialProvider, string> = {
  KAKAO: '카카오',
  NAVER: '네이버',
  GOOGLE: '구글',
};

export const GENDER_LABELS: Record<OnboardingGender, string> = {
  MALE: '남성',
  FEMALE: '여성',
  NONE: '해당없음',
};

export const AGE_LABELS: Record<OnboardingAge, string> = {
  TEENS: '10대',
  TWENTIES: '20대',
  THIRTIES: '30대',
  FORTIES: '40대',
  FIFTIES: '50대',
  SIXTIES_PLUS: '60대 이상',
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
