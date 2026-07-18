import { useNavigate } from 'react-router';
import {
  clearAuthTokens,
  requestSocialLogin,
  startKakaoAuthorization,
  type SocialProvider,
} from '@/features/auth';
import {
  ONBOARDING_PATH_BY_STEP,
  useOnboardingStore,
} from '@/features/onboarding';
import { PATH } from '@/routes/path';
import { useSnackbarStore } from '@/shared/stores/snackbar.store';

export const useSocialAuthFlow = () => {
  const navigate = useNavigate();
  const startOnboarding = useOnboardingStore((state) => state.startOnboarding);
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

  const login = async (provider: SocialProvider) => {
    if (provider === 'KAKAO') {
      try {
        clearAuthTokens();
        startKakaoAuthorization();
      } catch {
        showSnackbar('카카오 로그인에 실패했습니다. 다시 시도해 주세요.', {
          variant: 'error',
        });
      }
      return;
    }

    const result = await requestSocialLogin(provider);

    if (result.status === 'AUTHENTICATED') {
      navigate(PATH.ROOT, { replace: true });
      return;
    }

    startOnboarding(result.provider);
    navigate(ONBOARDING_PATH_BY_STEP.terms);
  };

  return { login };
};
