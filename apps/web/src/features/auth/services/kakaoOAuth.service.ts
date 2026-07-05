const KAKAO_AUTHORIZE_URL = 'https://kauth.kakao.com/oauth/authorize';

interface KakaoAuthorizationUrlParams {
  clientId: string;
  redirectUri: string;
}

export const createKakaoAuthorizationUrl = ({
  clientId,
  redirectUri,
}: KakaoAuthorizationUrlParams) => {
  const url = new URL(KAKAO_AUTHORIZE_URL);
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('response_type', 'code');
  console.log(url.toString());
  return url.toString();
};

// 카카오 로그인 후 백엔드가 인가 코드를 처리하도록 요청합니다.
export const startKakaoAuthorization = () => {
  const clientId = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    throw new Error('Kakao OAuth environment variables are missing');
  }

  window.location.assign(
    createKakaoAuthorizationUrl({ clientId, redirectUri })
  );
};

// https://kauth.kakao.com/oauth/authorize?client_id=c0b6f07fe2bdca32e0b6c1c4f8b8793d&redirect_uri=http://localhost:8080/login/oauth2/code/kakao&response_type=codeNavigated
// https://kauth.kakao.com/oauth/authorize?client_id=c0b6f07fe2bdca32e0b6c1c4f8b8793d&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Flogin%2Foauth2%2Fcode%2Fkakao&response_type=code
