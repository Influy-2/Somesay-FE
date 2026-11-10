/**
 * `fetchClient.POST(...)` 처럼 React Query 밖에서 직접 부른 요청의 결과에서
 * 응답 래퍼({ code, message, data })를 벗겨 `data` 만 돌려줍니다.
 *
 * 실패 응답이면 서버 에러 본문(ApiErrorResponse)을 throw 합니다. `useApiQuery` 와 같은 규칙이라
 * `useMutation` 의 onError 가 같은 에러(`ApiQueryError`)를 받습니다.
 * @example
 * const signUpInfo = await unwrapApiData(
 *   fetchClient.POST('/api/v1/auth/signup', { body })
 * );
 */
export const unwrapApiData = async <Data>(
  request: Promise<{
    data?: { data: Data };
    error?: unknown;
    response: Response;
  }>
): Promise<Data> => {
  const { data, error, response } = await request;

  if (error !== undefined || data === undefined) {
    throw error ?? new Error(`Empty API response (status ${response.status})`);
  }

  return data.data;
};
