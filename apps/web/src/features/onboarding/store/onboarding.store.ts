import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { SocialProvider } from '@/features/auth';
import {
  INITIAL_ONBOARDING_DRAFT,
  ONBOARDING_STEP_ORDER,
  ONBOARDING_STORAGE_KEY,
} from '../constants/onboarding.constants';
import type {
  OnboardingAge,
  OnboardingDraft,
  OnboardingGender,
  OnboardingStep,
  ProductFitStatus,
} from '../types/onboarding.types';

//스토어가 제공하는 모든 변경 함수의 타입입니다.
interface OnboardingActions {
  hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void; //sessionStorage 복원이 끝났는지를 기록합니다.
  startOnboarding: (provider: SocialProvider) => void; //신규 회원의 provider를 저장하며 이전 온보딩 데이터는 초기화합니다.
  setAgreement: (agreementId: string, agreed: boolean) => void; //특정 약관 동의 상태를 저장합니다.
  setEmail: (email: string) => void;
  markEmailVerified: (verified?: boolean) => void;
  setNickname: (nickname: string) => void;
  setProfile: (
    //두 데이터가 같은 페이지에서 입력되는 구조라 하나의 액션으로 묶었습니다.
    gender: OnboardingGender | null,
    age: OnboardingAge | null
  ) => void;
  toggleSkinTypeName: (skinTypeName: string) => void;
  toggleConcern: (concern: string) => void;
  toggleProduct: (status: ProductFitStatus, productId: number) => void;
  markStepComplete: (step: OnboardingStep) => void;
  reset: () => void;
}

export type OnboardingStore = OnboardingDraft & OnboardingActions;

const toggleWithLimit = (values: string[], value: string, limit = 2) => {
  if (values.includes(value)) {
    return values.filter((item) => item !== value);
  }

  return values.length < limit ? [...values, value] : values;
};

const toggleNumber = (values: number[], value: number) =>
  values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];

const invalidateFrom = (
  completedSteps: OnboardingStep[],
  step: OnboardingStep
) => {
  const changedStepIndex = ONBOARDING_STEP_ORDER.indexOf(step);

  return completedSteps.filter(
    (completedStep) =>
      ONBOARDING_STEP_ORDER.indexOf(completedStep) < changedStepIndex
  );
};

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      ...INITIAL_ONBOARDING_DRAFT,
      hasHydrated: false,
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      startOnboarding: (provider) =>
        set({
          ...INITIAL_ONBOARDING_DRAFT,
          provider,
        }),
      setAgreement: (agreementId, agreed) =>
        set((state) => ({
          agreements: {
            ...state.agreements,
            [agreementId]: agreed,
          },
          completedSteps: invalidateFrom(state.completedSteps, 'terms'),
        })),
      setEmail: (email) =>
        set((state) => ({
          email,
          emailVerified: false,
          completedSteps: invalidateFrom(state.completedSteps, 'email'),
        })),
      markEmailVerified: (verified = true) =>
        set((state) => ({
          emailVerified: verified,
          completedSteps: verified
            ? state.completedSteps
            : invalidateFrom(state.completedSteps, 'emailVerification'),
        })),
      setNickname: (nickname) =>
        set((state) => ({
          nickname,
          completedSteps: invalidateFrom(state.completedSteps, 'nickname'),
        })),
      setProfile: (gender, age) =>
        set((state) => ({
          gender,
          age,
          completedSteps: invalidateFrom(state.completedSteps, 'profile'),
        })),
      toggleSkinTypeName: (skinTypeName) =>
        set((state) => ({
          skinTypeNames: toggleWithLimit(state.skinTypeNames, skinTypeName),
          completedSteps: invalidateFrom(state.completedSteps, 'skinTypes'),
        })),
      toggleConcern: (concern) =>
        set((state) => ({
          concerns: toggleWithLimit(state.concerns, concern),
          completedSteps: invalidateFrom(state.completedSteps, 'skinConcerns'),
        })),
      toggleProduct: (status, productId) =>
        set((state) => {
          const isMatched = status === 'MATCHED';

          return {
            matchedProductIds: isMatched
              ? toggleNumber(state.matchedProductIds, productId)
              : state.matchedProductIds,
            mismatchedProductIds: isMatched
              ? state.mismatchedProductIds
              : toggleNumber(state.mismatchedProductIds, productId),
            completedSteps: invalidateFrom(
              state.completedSteps,
              isMatched ? 'matchedProducts' : 'mismatchedProducts'
            ),
          };
        }),
      markStepComplete: (step) =>
        set((state) => ({
          completedSteps: state.completedSteps.includes(step)
            ? state.completedSteps
            : [...state.completedSteps, step],
        })),
      reset: () =>
        set((state) => ({
          ...INITIAL_ONBOARDING_DRAFT,
          hasHydrated: state.hasHydrated,
        })),
    }),
    {
      name: ONBOARDING_STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => sessionStorage),
      partialize: ({
        provider,
        agreements,
        email,
        emailVerified,
        nickname,
        gender,
        age,
        skinTypeNames,
        concerns,
        matchedProductIds,
        mismatchedProductIds,
        completedSteps,
      }) => ({
        provider,
        agreements,
        email,
        emailVerified,
        nickname,
        gender,
        age,
        skinTypeNames,
        concerns,
        matchedProductIds,
        mismatchedProductIds,
        completedSteps,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
