import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchUserProfileImage, QUERY_KEYS } from '@somesay/shared';

import { useSnackbarStore } from '@/shared/stores';

interface UploadProfileImageOptions {
  // 성공·실패와 관계없이 업로드가 끝나면 호출합니다(미리보기 정리용).
  onSettled?: () => void;
}

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

  // 호출부 콜백을 받기 위해 mutate 옵션으로 넘깁니다.
  // 훅 옵션의 onSuccess가 invalidate Promise를 반환하므로 호출부 onSettled는 재조회가 끝난 뒤 실행됩니다.
  // 그래서 미리보기를 지워도 옛 이미지가 잠깐 깜빡이지 않습니다.
  const uploadProfileImage = (
    profileImage: File,
    { onSettled }: UploadProfileImageOptions = {}
  ) => mutate(profileImage, { onSettled: () => onSettled?.() });

  return { uploadProfileImage, isPending };
};
