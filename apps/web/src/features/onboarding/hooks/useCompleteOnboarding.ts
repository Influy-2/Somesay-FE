import { useCallback } from 'react';
import {
  postLoginInfo,
  QUERY_KEYS,
  type LoginInfoType,
  type UserProductRequestType,
} from '@somesay/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { usePostUserProduct } from '@/shared/hooks';
import { useSnackbarStore } from '@/shared/stores/snackbar.store';
import { useOnboardingStore } from '../stores/onboarding.store';
import { finalizeOnboarding } from '../utils/onboarding.completion';
import { buildProductFitPayloads } from '../utils/onboarding.mapper';

interface CompleteOnboardingVariables {
  loginInfo: LoginInfoType;
  userProducts: UserProductRequestType[];
}

// 온보딩 기본 정보를 저장하고 회원가입을 완료합니다.
export const useCompleteOnboarding = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
  const { mutateAsync: postUserProduct } = usePostUserProduct();
  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      loginInfo,
      userProducts,
    }: CompleteOnboardingVariables) => {
      await postLoginInfo(loginInfo);
      await Promise.all(
        userProducts.map((userProduct) => postUserProduct(userProduct))
      );
    },
    retry: false,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.INFO() });
      finalizeOnboarding(navigate);
    },
    onError: () => {
      showSnackbar('회원가입 정보 저장에 실패했습니다. 다시 시도해 주세요.', {
        variant: 'error',
      });
    },
  });

  const completeOnboarding = useCallback(() => {
    if (isPending) return;

    const store = useOnboardingStore.getState();
    const { nickname, gender, age, concerns, skinTypeNames } = store;

    if (gender === null || age === null) {
      showSnackbar('회원가입 기본 정보를 확인해 주세요.', {
        variant: 'error',
      });
      return;
    }

    const loginInfo: LoginInfoType = {
      nickname: nickname.trim(),
      gender,
      age,
      concerns,
      skinTypeNames,
    };

    mutate({
      loginInfo,
      userProducts: buildProductFitPayloads(store),
    });
  }, [isPending, mutate, showSnackbar]);

  return { completeOnboarding, isPending };
};
