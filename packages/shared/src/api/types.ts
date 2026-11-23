// 서버 에러 본문입니다. 스펙의 에러 응답(400/401/404)이 `unknown` 으로 생성돼 손으로 둡니다.
export interface ApiErrorResponse<TData = null> {
  code: string;
  message: string;
  data?: TData;
}
