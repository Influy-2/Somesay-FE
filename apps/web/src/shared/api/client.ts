import createFetchClient from 'openapi-fetch';
import createQueryClient from 'openapi-react-query';
import type { paths } from '@somesay/shared';

const DEFAULT_API_ORIGIN = 'http://localhost:8080';
const REQUEST_TIMEOUT_MS = 10000;

// 스펙 경로에 /api/v1 이 이미 들어 있어 VITE_API_BASE_URL 은 origin 만 둡니다. (예: https://somesay.kr)
const apiOrigin = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_ORIGIN;

/**
 * 요청마다 10초 timeout 을 걸되 React Query 의 취소 신호(request.signal)는 그대로 살립니다.
 * AbortSignal.any 는 Safari 17.4 / Chrome 116 이상에서만 있어 구버전 iOS 에서 모든 요청이 실패합니다.
 * 그래서 AbortController 로 두 신호를 직접 합칩니다. timeout 은 응답 헤더가 올 때까지만 겁니다.
 */
const fetchWithTimeout = async (request: Request) => {
  const controller = new AbortController();
  const abortByCaller = () => controller.abort(request.signal.reason);

  if (request.signal.aborted) {
    abortByCaller();
  } else {
    request.signal.addEventListener('abort', abortByCaller, { once: true });
  }

  const timer = setTimeout(
    () =>
      controller.abort(new DOMException('Request timed out', 'TimeoutError')),
    REQUEST_TIMEOUT_MS
  );

  try {
    return await fetch(request, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
    request.signal.removeEventListener('abort', abortByCaller);
  }
};

/**
 * 스펙(`paths`) 타입을 아는 fetch 클라이언트입니다.
 * 경로·파라미터·바디·응답이 모두 스펙에서 추론되므로 엔드포인트 상수와 응답 타입을 손으로 쓰지 않습니다.
 * 인증 미들웨어는 앱 시작 시 `app/setupApiClient.ts` 에서 붙입니다. (shared 가 features 를 모르게)
 */
export const fetchClient = createFetchClient<paths>({
  baseUrl: apiOrigin,
  fetch: fetchWithTimeout,
});

// TanStack Query 래퍼입니다. 쿼리 키는 ['get', 경로, init] 으로 자동 생성됩니다.
export const $api = createQueryClient(fetchClient);
