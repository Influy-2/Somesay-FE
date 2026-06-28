import { useNavigate } from 'react-router';
import { requestSocialLogin, type SocialProvider } from '@/features/auth';
import {
  ONBOARDING_PATH_BY_STEP,
  useOnboardingStore,
} from '@/features/onboarding';
import { PATH } from '@/routes/path';

export const useSocialAuthFlow = () => {
  const navigate = useNavigate();
  const startOnboarding = useOnboardingStore((state) => state.startOnboarding);

  const login = async (provider: SocialProvider) => {
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
