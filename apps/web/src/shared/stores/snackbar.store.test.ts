import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useSnackbarStore } from './snackbar.store';

describe('snackbar store', () => {
  beforeEach(() => {
    useSnackbarStore.getState().hideSnackbar();
  });

  it('기본 위치와 타입으로 스낵바를 표시한다', () => {
    useSnackbarStore.getState().showSnackbar('저장되었습니다.');

    expect(useSnackbarStore.getState().current).toMatchObject({
      message: '저장되었습니다.',
      variant: 'default',
      placement: 'default',
    });
  });

  it('같은 메시지를 다시 표시해도 새로운 스낵바로 교체한다', () => {
    const { showSnackbar } = useSnackbarStore.getState();

    showSnackbar('최대 15개까지 저장 가능해요.');
    const firstId = useSnackbarStore.getState().current?.id;
    showSnackbar('최대 15개까지 저장 가능해요.');
    const secondId = useSnackbarStore.getState().current?.id;

    expect(secondId).not.toBe(firstId);
  });

  it('이전 스낵바의 닫기 요청으로 현재 스낵바를 닫지 않는다', () => {
    const { showSnackbar, hideSnackbar } = useSnackbarStore.getState();

    showSnackbar('첫 번째 메시지');
    const firstId = useSnackbarStore.getState().current?.id;
    showSnackbar('두 번째 메시지', {
      variant: 'error',
      placement: 'onboardingBottom48',
    });
    hideSnackbar(firstId);

    expect(useSnackbarStore.getState().current).toMatchObject({
      message: '두 번째 메시지',
      variant: 'error',
      placement: 'onboardingBottom48',
    });
  });

  it('액션을 보관한다', () => {
    const onClick = vi.fn();

    useSnackbarStore.getState().showSnackbar('삭제되었습니다.', {
      action: { label: '실행 취소', onClick },
    });
    useSnackbarStore.getState().current?.action?.onClick();

    expect(onClick).toHaveBeenCalledOnce();
  });
});
