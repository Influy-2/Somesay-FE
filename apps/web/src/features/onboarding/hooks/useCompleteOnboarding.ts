import { useCallback } from 'react';
import { postLoginInfo, type LoginInfoType } from '@somesay/shared';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { PATH } from '@/routes/path';
import { useSnackbarStore } from '@/shared/stores/snackbar.store';
import { useOnboardingStore } from '../store/onboarding.store';

// 온보딩 기본 정보를 저장하고 회원가입을 완료합니다.
export const useCompleteOnboarding = () => {
  const navigate = useNavigate();
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
  const { mutate, isPending } = useMutation({
    mutationFn: postLoginInfo,
    retry: false,
    onSuccess: () => {
      useOnboardingStore.getState().reset();
      navigate(PATH.ROOT, { replace: true });
    },
    onError: () => {
      showSnackbar('회원가입 정보 저장에 실패했습니다. 다시 시도해 주세요.', {
        variant: 'error',
      });
    },
  });

  const completeOnboarding = useCallback(() => {
    if (isPending) return;

    const { nickname, gender, age, concerns, skinTypeNames } =
      useOnboardingStore.getState();

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

    mutate(loginInfo);
  }, [isPending, mutate, showSnackbar]);

  return { completeOnboarding, isPending };
};
