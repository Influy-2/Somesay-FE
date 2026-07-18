import type { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useOnboardingStore } from '../store/onboarding.store';
import type { OnboardingStep } from '../types/onboarding.types';
import {
  getOnboardingEntryPath,
  getOnboardingRedirectPath,
} from '../utils/onboarding.flow';

interface OnboardingRouteGuardProps {
  step: OnboardingStep;
  children: ReactNode;
}

const HydrationFallback = () => (
  <div
    className="flex min-h-full flex-1 items-center justify-center"
    role="status"
    aria-live="polite"
  >
    <span className="body2-m text-grey06">
      온보딩 정보를 불러오는 중입니다.
    </span>
  </div>
);
//잘못된 순서로 페이지에 접근하는 것을 막습니다.이 과정이 없으면 새로고침 순간 provider가 null인 초기 상태로 읽혀 /login으로 튕길 수 있습니다.
/**
 * 동작 순서는 다음과 같습니다.
 * 스토어 hydration 확인
 * 현재 draft와 목표 step을 getOnboardingRedirectPath에 전달
 * 이동해야 하면 <Navigate replace />
 *  접근 가능하면 children 렌더링
 * replace를 사용하는 이유는 잘못 접근한 URL을 브라우저 히스토리에 남기지 않기 위해서입니다.
 *  */

export const OnboardingRouteGuard = ({
  step,
  children,
}: OnboardingRouteGuardProps) => {
  const store = useOnboardingStore();

  if (!store.hasHydrated) return <HydrationFallback />;

  const redirectPath = getOnboardingRedirectPath(store, step);

  return redirectPath ? <Navigate to={redirectPath} replace /> : children;
};

export const OnboardingIndexRedirect = () => {
  const store = useOnboardingStore();

  if (!store.hasHydrated) return <HydrationFallback />;

  return <Navigate to={getOnboardingEntryPath(store)} replace />;
};
