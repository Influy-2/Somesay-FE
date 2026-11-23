import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import {
  clearAuthTokens,
  clearKakaoAuthorizationState,
  consumeAuthRedirectPath,
  isValidKakaoAuthorizationState,
  saveAuthTokens,
} from '@/features/auth';
import {
  ONBOARDING_PATH_BY_STEP,
  useOnboardingStore,
} from '@/features/onboarding';
import { PATH } from '@/routes/path';
import { usePostKakaoLogin } from '@/shared/hooks';
import { useSnackbarStore } from '@/shared/stores';

// 카카오 콜백 검증부터 로그인 완료 후 이동까지 처리합니다.
export const useKakaoCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const startOnboarding = useOnboardingStore((state) => state.startOnboarding);
  const resetOnboarding = useOnboardingStore((state) => state.reset);
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
  const { mutateAsync: postKakaoLogin } = usePostKakaoLogin();

  useEffect(() => {
    let ignore = false;

    const failKakaoLogin = () => {
      clearKakaoAuthorizationState();
      clearAuthTokens();
      showSnackbar('카카오 로그인에 실패했습니다. 다시 시도해 주세요.', {
        variant: 'error',
      });
      navigate(PATH.LOGIN.BASE, { replace: true });
    };

    const completeKakaoLogin = async () => {
      const code = searchParams.get('code');
      const authorizationState = searchParams.get('state');

      if (
        searchParams.has('error') ||
        !code ||
        !isValidKakaoAuthorizationState(authorizationState)
      ) {
        failKakaoLogin();
        return;
      }

      try {
        const { jwtAccessToken, refreshToken, isNewUser, userNickname } =
          await postKakaoLogin(code);

        if (ignore) return;

        // 타입상 항상 있지만 서버 응답이 어긋나면 빈 토큰을 저장하지 않도록 남겨 둡니다.
        if (!jwtAccessToken || !refreshToken) {
          throw new Error('Kakao login response does not contain JWT tokens');
        }

        clearKakaoAuthorizationState();
        saveAuthTokens({ accessToken: jwtAccessToken, refreshToken });

        if (isNewUser || !userNickname) {
          startOnboarding('KAKAO');
          navigate(ONBOARDING_PATH_BY_STEP.terms, { replace: true });
          return;
        }

        resetOnboarding();
        navigate(consumeAuthRedirectPath() ?? PATH.ROOT, { replace: true });
      } catch {
        if (!ignore) {
          failKakaoLogin();
        }
      }
    };

    void completeKakaoLogin();

    return () => {
      ignore = true;
    };
  }, [
    navigate,
    postKakaoLogin,
    resetOnboarding,
    searchParams,
    showSnackbar,
    startOnboarding,
  ]);
};
