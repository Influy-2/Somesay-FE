const AUTH_REDIRECT_PATH_STORAGE_KEY = 'somesay_auth_redirect_path';

const isSafeInternalPath = (path: string) =>
  path.startsWith('/') && !path.startsWith('//');

// OAuth 이동 전에 로그인 후 돌아갈 서비스 내부 경로를 임시 저장합니다.
export const saveAuthRedirectPath = (path: string) => {
  if (!isSafeInternalPath(path)) return;

  sessionStorage.setItem(AUTH_REDIRECT_PATH_STORAGE_KEY, path);
};

// 로그인 완료 후 저장된 내부 경로를 한 번만 사용합니다.
export const consumeAuthRedirectPath = () => {
  const path = sessionStorage.getItem(AUTH_REDIRECT_PATH_STORAGE_KEY);
  sessionStorage.removeItem(AUTH_REDIRECT_PATH_STORAGE_KEY);

  return path && isSafeInternalPath(path) ? path : null;
};
