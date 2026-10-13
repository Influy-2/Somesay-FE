import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchUserProfileImage, QUERY_KEYS } from '@somesay/shared';

import { useSnackbarStore } from '@/shared/stores';

// 프로필 이미지를 변경합니다.
export const usePatchUserProfileImage = () => {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

  const { mutate, isPending } = useMutation({
    mutationFn: patchUserProfileImage,
    retry: false,
    onSuccess: () => {
      showSnackbar('프로필 이미지를 변경했어요.');
      // 프로필 이미지는 /users/info와 /users/mypage 양쪽에 실려 있어 사용자 쿼리를 함께 갱신합니다.
      return queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.ALL });
    },
    onError: () => {
      showSnackbar(
        '프로필 이미지를 변경하지 못했어요. 잠시 후 다시 시도해 주세요.',
        { variant: 'error' }
      );
    },
  });

  const uploadProfileImage = (profileImage: File) => mutate(profileImage);

  return { uploadProfileImage, isPending };
};
