import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { clearAuthTokens } from '@/features/auth';
import {
  ONBOARDING_PATH_BY_STEP,
  useOnboardingStore,
} from '@/features/onboarding';
import { PATH } from '@/routes/path';
import { useSnackbarStore } from '@/shared/stores/snackbar.store';

export const KakaoCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const startOnboarding = useOnboardingStore((state) => state.startOnboarding);
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

  useEffect(() => {
    if (searchParams.has('error')) {
      clearAuthTokens();
      showSnackbar('카카오 로그인에 실패했습니다. 다시 시도해 주세요.', {
        variant: 'error',
      });
      navigate(PATH.LOGIN.BASE, { replace: true });
      return;
    }

    startOnboarding('KAKAO');
    navigate(ONBOARDING_PATH_BY_STEP.terms, { replace: true });
  }, [navigate, searchParams, showSnackbar, startOnboarding]);

  return (
    <div
      className="flex min-h-full flex-1 items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <span className="body2-m text-grey06">
        카카오 로그인을 처리하고 있습니다.
      </span>
    </div>
  );
};
