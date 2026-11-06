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
import { fetchClient, unwrapApiData } from '@/shared/api';
import { useSnackbarStore } from '@/shared/stores';

// 카카오 인가 코드를 백엔드에 전달해 로그인 결과(JwtLoginResponse)를 받아옵니다.
// 응답은 { code, message, data } 래퍼로 오므로 data 를 벗겨 씁니다.
const postKakaoLogin = (code: string) =>
  unwrapApiData(
    fetchClient.POST('/api/v1/auth/login/kakao', {
      params: { query: { code } },
    })
  );

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
        const { jwtAccessToken, refreshToken, isNewUser, userNickname } =
          await getKakaoLoginRequest(code);

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
  }, [navigate, resetOnboarding, searchParams, showSnackbar, startOnboarding]);
};
