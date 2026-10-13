import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { SkinInfoRequest } from '@somesay/shared';

import { apiKey, fetchClient, unwrapApiData } from '@/shared/api';
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
    mutationFn: (body: SkinInfoRequest) =>
      unwrapApiData(fetchClient.PATCH('/api/v1/users/skin-info', { body })),
    retry: false,
    // 피부 타입은 /users/info와 /users/mypage 양쪽에 실려 있어 둘 다 갱신합니다.
    // Promise를 반환해 리페치가 끝난 뒤 호출부 onSuccess가 실행되므로, 이전 화면에서 옛 값이 잠깐 보이지 않습니다.
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: apiKey('/api/v1/users/info'),
        }),
        queryClient.invalidateQueries({
          queryKey: apiKey('/api/v1/users/mypage'),
        }),
      ]),
    onError: () => {
      showSnackbar('정보를 수정하지 못했어요. 잠시 후 다시 시도해 주세요.', {
        variant: 'error',
      });
    },
  });

  const updateSkinInfo = (
    patch: Partial<SkinInfoRequest>,
    { onSuccess }: UpdateSkinInfoOptions = {}
  ) => {
    if (!userInfo) return;

    // 서버가 두 목록을 요청 값으로 통째로 교체하므로, 바꾸지 않은 쪽도 현재 값으로 채워 보냅니다.
    mutate(
      {
        skinTypeIds: userInfo.userSkinTypes.map(({ skinTypeId }) => skinTypeId),
        skinConcernIds: userInfo.userSkinConcerns.map(
          ({ skinConcernId }) => skinConcernId
        ),
        ...patch,
      },
      { onSuccess: () => onSuccess?.() }
    );
  };

  return { updateSkinInfo, isPending };
};
