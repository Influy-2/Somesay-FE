import { useKakaoCallback } from '@/app/hooks/useKakaoCallback';

export const KakaoCallbackPage = () => {
  useKakaoCallback();

  return (
    <div
      className="flex min-h-full flex-1 items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <span className="body2-m text-grey06">
        카카오 로그인을 처리하고 있습니다.
      </span>
    </div>
  );
};
