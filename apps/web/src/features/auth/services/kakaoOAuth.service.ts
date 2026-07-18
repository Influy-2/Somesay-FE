const KAKAO_AUTHORIZE_URL = 'https://kauth.kakao.com/oauth/authorize';
const KAKAO_AUTHORIZATION_STATE_STORAGE_KEY = 'kakao_authorization_state';

interface KakaoAuthorizationUrlParams {
  clientId: string;
  redirectUri: string;
  state: string;
}

export const createKakaoAuthorizationUrl = ({
  clientId,
  redirectUri,
  state,
}: KakaoAuthorizationUrlParams) => {
  const url = new URL(KAKAO_AUTHORIZE_URL);
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('state', state);
  return url.toString();
};

// 콜백의 state가 로그인 시작 시 저장한 값과 같은지 확인합니다.
export const isValidKakaoAuthorizationState = (state: string | null) => {
  const savedState = sessionStorage.getItem(
    KAKAO_AUTHORIZATION_STATE_STORAGE_KEY
  );

  return Boolean(state && savedState && state === savedState);
};

// 사용이 끝난 카카오 OAuth state를 제거합니다.
export const clearKakaoAuthorizationState = () => {
  sessionStorage.removeItem(KAKAO_AUTHORIZATION_STATE_STORAGE_KEY);
};

// 카카오 인가 페이지로 이동해 프론트 콜백 주소로 인가 코드를 받습니다.
export const startKakaoAuthorization = () => {
  const clientId = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    throw new Error('Kakao OAuth environment variables are missing');
  }

  const state = crypto.randomUUID();
  sessionStorage.setItem(KAKAO_AUTHORIZATION_STATE_STORAGE_KEY, state);

  window.location.assign(
    createKakaoAuthorizationUrl({ clientId, redirectUri, state })
  );
};
