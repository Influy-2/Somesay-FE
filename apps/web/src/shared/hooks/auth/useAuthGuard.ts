import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { PATH } from '@/routes/path';
import { useSnackbarStore } from '@/shared/stores';
import { useAuth } from './useAuth';

// 공개 화면의 로그인 필요 행동을 동일한 UX로 보호합니다.
export const useAuthGuard = () => {
  const { status, refreshUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

  return useCallback(
    <TArgs extends unknown[], TResult>(action: (...args: TArgs) => TResult) =>
      (...args: TArgs): TResult | undefined => {
        if (status === 'authenticated') {
          return action(...args);
        }

        if (status === 'checking') {
          showSnackbar(
            '로그인 정보를 확인하고 있어요. 잠시 후 다시 시도해 주세요.'
          );
          return undefined;
        }

        if (status === 'error') {
          showSnackbar('로그인 정보를 확인하지 못했어요.', {
            variant: 'error',
            action: {
              label: '다시 시도',
              onClick: refreshUser,
            },
          });
          return undefined;
        }

        const from = `${location.pathname}${location.search}${location.hash}`;
        // TODO: 임시
        showSnackbar('로그인이 필요한 기능이에요.', {
          action: {
            label: '로그인',
            onClick: () =>
              navigate(PATH.LOGIN.BASE, {
                state: { from },
              }),
          },
        });

        return undefined;
      },
    [
      location.hash,
      location.pathname,
      location.search,
      navigate,
      refreshUser,
      showSnackbar,
      status,
    ]
  );
};
