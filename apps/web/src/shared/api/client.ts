import createFetchClient from 'openapi-fetch';
import createQueryClient from 'openapi-react-query';
import type { paths } from '@somesay/shared';

const DEFAULT_API_ORIGIN = 'http://localhost:8080';
const REQUEST_TIMEOUT_MS = 10000;

// 스펙 경로에 /api/v1 이 이미 들어 있어 origin 만 씁니다.
// (axios 용 VITE_API_BASE_URL 은 …/api/v1 까지라, 공존 기간에는 같은 값에서 origin 만 꺼냅니다)
const apiOrigin = import.meta.env.VITE_API_BASE_URL
  ? new URL(import.meta.env.VITE_API_BASE_URL).origin
  : DEFAULT_API_ORIGIN;

/**
 * 스펙(`paths`) 타입을 아는 fetch 클라이언트입니다.
 * 경로·파라미터·바디·응답이 모두 스펙에서 추론되므로 엔드포인트 상수와 응답 타입을 손으로 쓰지 않습니다.
 * 인증 미들웨어는 앱 시작 시 `app/setupApiClient.ts` 에서 붙입니다. (shared 가 features 를 모르게)
 */
export const fetchClient = createFetchClient<paths>({
  baseUrl: apiOrigin,
  // axios 의 timeout 을 대신합니다. React Query 의 취소 신호(request.signal)는 그대로 살립니다.
  fetch: (request) =>
    fetch(request, {
      signal: AbortSignal.any([
        request.signal,
        AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      ]),
    }),
});

// TanStack Query 래퍼입니다. 쿼리 키는 ['get', 경로, init] 으로 자동 생성됩니다.
export const $api = createQueryClient(fetchClient);
