import { useMutation } from '@tanstack/react-query';
import { fetchClient, unwrapApiData } from '@/shared/api';

// 카카오 인가 코드를 백엔드에 전달해 로그인 결과(JwtLoginResponse)를 받아옵니다.
const postKakaoLogin = (code: string) =>
  unwrapApiData(
    fetchClient.POST('/api/v1/auth/login/kakao', {
      params: { query: { code } },
    })
  );

const kakaoLoginRequests = new Map<string, ReturnType<typeof postKakaoLogin>>();

// 인가 코드는 한 번만 쓸 수 있어, 개발 모드의 effect 재실행에서도 같은 코드는 한 번만 교환합니다.
const postKakaoLoginOnce = (code: string) => {
  const cachedRequest = kakaoLoginRequests.get(code);
  if (cachedRequest) return cachedRequest;

  const request = postKakaoLogin(code).finally(() => {
    kakaoLoginRequests.delete(code);
  });

  kakaoLoginRequests.set(code, request);
  return request;
};

// 카카오 인가 코드로 로그인합니다.
export const usePostKakaoLogin = () =>
  useMutation({
    mutationFn: postKakaoLoginOnce,
    retry: false,
  });
