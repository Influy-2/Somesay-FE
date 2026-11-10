import { useCallback } from 'react';
import type {
  SignUpInfoRequest,
  UserProductRequestType,
} from '@somesay/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { apiKey, fetchClient, unwrapApiData } from '@/shared/api';
import { usePostUserProduct } from '@/shared/hooks';
import { useSnackbarStore } from '@/shared/stores';
import { useOnboardingStore } from '../stores/onboarding.store';
import { finalizeOnboarding } from '../utils/onboarding.completion';
import {
  buildProductFitPayloads,
  buildSignUpInfoRequest,
} from '../utils/onboarding.mapper';

interface CompleteOnboardingVariables {
  signUpInfo: SignUpInfoRequest;
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
      signUpInfo,
      userProducts,
    }: CompleteOnboardingVariables) => {
      await unwrapApiData(
        fetchClient.POST('/api/v1/auth/signup', { body: signUpInfo })
      );
      await Promise.all(
        userProducts.map((userProduct) => postUserProduct(userProduct))
      );
    },
    retry: false,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: apiKey('/api/v1/users/info'),
      });
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
    const { gender, age } = store;

    if (gender === null || age === null) {
      showSnackbar('회원가입 기본 정보를 확인해 주세요.', {
        variant: 'error',
      });
      return;
    }

    mutate({
      signUpInfo: buildSignUpInfoRequest({ ...store, gender, age }),
      userProducts: buildProductFitPayloads(store),
    });
  }, [isPending, mutate, showSnackbar]);

  return { completeOnboarding, isPending };
};
