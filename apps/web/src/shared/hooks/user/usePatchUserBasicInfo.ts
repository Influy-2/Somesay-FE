import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  patchUserBasicInfo,
  QUERY_KEYS,
  type UserBasicInfoType,
} from '@somesay/shared';

import { useSnackbarStore } from '@/shared/stores';
import { useFetchUserInfo } from './useFetchUserInfo';

interface UpdateBasicInfoOptions {
  onSuccess?: () => void;
}

// 닉네임·성별·연령 중 바꾼 값만 받아 기본 정보를 수정합니다.
export const usePatchUserBasicInfo = () => {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
  const { data: userInfo } = useFetchUserInfo();

  const { mutate, isPending } = useMutation({
    mutationFn: patchUserBasicInfo,
    retry: false,
    // 닉네임은 /users/info와 /users/mypage 양쪽에 실려 있어 사용자 쿼리를 함께 갱신합니다.
    // Promise를 반환해 리페치가 끝난 뒤 호출부 onSuccess가 실행되므로, 이전 화면에서 옛 값이 잠깐 보이지 않습니다.
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.ALL }),
    onError: () => {
      showSnackbar('정보를 수정하지 못했어요. 잠시 후 다시 시도해 주세요.', {
        variant: 'error',
      });
    },
  });

  const updateBasicInfo = (
    patch: Partial<UserBasicInfoType>,
    { onSuccess }: UpdateBasicInfoOptions = {}
  ) => {
    if (!userInfo) return;

    // 서버가 부분 수정을 받는지 확인되지 않아, 바꾸지 않은 값도 현재 값으로 채워 전부 보냅니다.
    mutate(
      {
        nickname: userInfo.nickname,
        gender: userInfo.gender,
        age: userInfo.age,
        ...patch,
      },
      { onSuccess: () => onSuccess?.() }
    );
  };

  return { updateBasicInfo, isPending };
};
