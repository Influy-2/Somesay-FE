import { useEffect } from 'react';
import { postKakaoLogin } from '@somesay/shared';
import { useNavigate, useSearchParams } from 'react-router';
import {
  clearAuthTokens,
  clearKakaoAuthorizationState,
  isValidKakaoAuthorizationState,
  saveAuthTokens,
} from '@/features/auth';
import {
  ONBOARDING_PATH_BY_STEP,
  useOnboardingStore,
} from '@/features/onboarding';
import { PATH } from '@/routes/path';
import { useSnackbarStore } from '@/shared/stores/snackbar.store';

const kakaoLoginRequests = new Map<string, ReturnType<typeof postKakaoLogin>>();

// 개발 모드의 effect 재실행에서도 같은 인가 코드를 한 번만 교환합니다.
const getKakaoLoginRequest = (code: string) => {
  const cachedRequest = kakaoLoginRequests.get(code);
  if (cachedRequest) return cachedRequest;

  const request = postKakaoLogin(code).finally(() => {
    kakaoLoginRequests.delete(code);
  });

  kakaoLoginRequests.set(code, request);
  return request;
};

// 카카오 콜백 검증부터 로그인 완료 후 이동까지 처리합니다.
export const useKakaoCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const startOnboarding = useOnboardingStore((state) => state.startOnboarding);
  const resetOnboarding = useOnboardingStore((state) => state.reset);
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

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
        const { accessToken, refreshToken, newUser } =
          await getKakaoLoginRequest(code);

        if (ignore) return;

        if (!accessToken || !refreshToken) {
          throw new Error('Kakao login response does not contain JWT tokens');
        }

        clearKakaoAuthorizationState();
        saveAuthTokens({ accessToken, refreshToken });

        if (newUser) {
          startOnboarding('KAKAO');
          navigate(ONBOARDING_PATH_BY_STEP.terms, { replace: true });
          return;
        }

        resetOnboarding();
        navigate(PATH.ROOT, { replace: true });
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
  }, [navigate, resetOnboarding, searchParams, showSnackbar, startOnboarding]);
};
