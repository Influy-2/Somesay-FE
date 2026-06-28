export type SocialProvider = 'KAKAO' | 'NAVER' | 'GOOGLE';

export type OnboardingGender = 'MALE' | 'FEMALE' | 'NONE';

export type OnboardingAge =
  | 'TEENS'
  | 'TWENTIES'
  | 'THIRTIES'
  | 'FORTIES'
  | 'FIFTIES'
  | 'SIXTIES_PLUS';

export type ProductFitStatus = 'MATCHED' | 'MISMATCHED';

export type OnboardingStep =
  | 'terms'
  | 'email'
  | 'emailVerification'
  | 'nickname'
  | 'profile'
  | 'skinTypes'
  | 'skinConcerns'
  | 'matchedProducts'
  | 'mismatchedProducts'
  | 'complete';

//온보딩이 진행되는 동안 저장하는 전체 임시 데이터입니다.
export interface OnboardingDraft {
  provider: SocialProvider | null;
  agreements: Record<string, boolean>;
  email: string;
  emailVerified: boolean;
  nickname: string;
  gender: OnboardingGender | null;
  age: OnboardingAge | null;
  skinTypeNames: string[];
  concerns: string[];
  matchedProductIds: number[];
  mismatchedProductIds: number[];
  completedSteps: OnboardingStep[];
}
