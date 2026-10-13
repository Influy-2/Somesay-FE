import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  patchUserSkinInfo,
  QUERY_KEYS,
  type UserSkinInfoType,
} from '@somesay/shared';

import { useSnackbarStore } from '@/shared/stores';
import { useFetchUserInfo } from './useFetchUserInfo';

interface UpdateSkinInfoOptions {
  onSuccess?: () => void;
}

// 피부 타입·피부 고민 중 바꾼 값만 받아 피부 정보를 수정합니다.
export const usePatchUserSkinInfo = () => {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
  const { data: userInfo } = useFetchUserInfo();

  const { mutate, isPending } = useMutation({
    mutationFn: patchUserSkinInfo,
    retry: false,
    // 피부 타입은 /users/info와 /users/mypage 양쪽에 실려 있어 사용자 쿼리를 함께 갱신합니다.
    // Promise를 반환해 리페치가 끝난 뒤 호출부 onSuccess가 실행되므로, 이전 화면에서 옛 값이 잠깐 보이지 않습니다.
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.ALL }),
    onError: () => {
      showSnackbar('정보를 수정하지 못했어요. 잠시 후 다시 시도해 주세요.', {
        variant: 'error',
      });
    },
  });

  const updateSkinInfo = (
    patch: Partial<UserSkinInfoType>,
    { onSuccess }: UpdateSkinInfoOptions = {}
  ) => {
    if (!userInfo) return;

    // 서버가 부분 수정을 받는지 확인되지 않아, 바꾸지 않은 값도 현재 값으로 채워 전부 보냅니다.
    mutate(
      {
        skinTypeIds: userInfo.skinTypeIds,
        skinExpectationIds: userInfo.skinExpectationIds,
        ...patch,
      },
      { onSuccess: () => onSuccess?.() }
    );
  };

  return { updateSkinInfo, isPending };
};
