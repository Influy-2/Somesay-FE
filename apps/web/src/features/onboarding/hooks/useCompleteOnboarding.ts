import { useRef } from 'react';
import { useNavigate } from 'react-router';
import { PATH } from '@/routes/path';
import { usePostLoginInfo } from '@/shared/hooks';
import { useSnackbarStore } from '@/shared/stores/snackbar.store';
import { useOnboardingStore } from '../store/onboarding.store';
import { buildSignupPayload } from '../utils/onboarding.mapper';

// 온보딩 기본 정보를 저장하고 회원가입을 완료합니다.
export const useCompleteOnboarding = () => {
  const navigate = useNavigate();
  const isSubmittingRef = useRef(false);
  const { mutateAsync, isPending } = usePostLoginInfo();
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

  const completeOnboarding = async () => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    try {
      const store = useOnboardingStore.getState();
      const payload = buildSignupPayload(store);

      await mutateAsync(payload);
      store.reset();
      navigate(PATH.ROOT, { replace: true });
    } catch {
      showSnackbar('회원가입 정보 저장에 실패했습니다. 다시 시도해 주세요.', {
        variant: 'error',
      });
    } finally {
      isSubmittingRef.current = false;
    }
  };

  return { completeOnboarding, isPending };
};
