import { isRouteErrorResponse, Link, useRouteError } from 'react-router';
import { PATH } from '@/routes/path';

const getErrorMessage = (error: unknown) => {
  if (isRouteErrorResponse(error)) {
    return `${error.status} ${error.statusText}`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return '알 수 없는 오류가 발생했습니다.';
};

// 라우트에서 처리되지 않은 오류를 보여주는 임시 전역 에러 화면입니다.
export const GlobalError = () => {
  const error = useRouteError();
  const message = getErrorMessage(error);

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <main className="flex h-dvh w-screen max-w-110 min-w-[20rem] flex-col items-center justify-center bg-white px-4 text-center">
      <div className="flex w-full flex-col items-center gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="headline4 text-black">문제가 발생했어요</h1>
          <p className="body2-m text-grey06">잠시 후 다시 시도해 주세요.</p>
          {import.meta.env.DEV && (
            <p className="body2-m text-grey05 break-words">{message}</p>
          )}
        </div>

        <div className="flex w-full flex-col gap-2">
          <button
            type="button"
            onClick={handleReload}
            className="body1-sb flex h-12 w-full items-center justify-center bg-black text-white"
          >
            새로고침
          </button>
          <Link
            to={PATH.ROOT}
            className="border-grey03 body2-m text-grey-black flex h-10 w-full items-center justify-center border"
          >
            홈으로
          </Link>
        </div>
      </div>
    </main>
  );
};
