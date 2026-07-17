import type { ReactNode } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { PATH } from '@/routes/path';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children?: ReactNode;
}

// 로그인 사용자만 접근할 수 있는 페이지를 보호합니다.
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { status, refreshUser } = useAuth();
  const location = useLocation();

  //로그인 진행시 페이지 정보 확인 임시 UI
  if (status === 'checking') {
    return (
      <div className="body2-m flex min-h-full flex-1 items-center justify-center">
        로그인 정보를 확인하고 있어요.
      </div>
    );
  }

  //로그인 실패시 임시 UI
  if (status === 'error') {
    return (
      <div className="flex min-h-full flex-1 flex-col items-center justify-center gap-3">
        <p className="body2-m">로그인 정보를 확인하지 못했어요.</p>
        <button type="button" className="body2-sb" onClick={refreshUser}>
          다시 시도
        </button>
      </div>
    );
  }

  // 로그인 안 한 사람이 로그인 필요한 페이지 접근시
  if (status === 'unauthenticated') {
    const from = `${location.pathname}${location.search}${location.hash}`;
    return <Navigate to={PATH.LOGIN.BASE} replace state={{ from }} />;
  }

  return children ? <>{children}</> : <Outlet />;
};
