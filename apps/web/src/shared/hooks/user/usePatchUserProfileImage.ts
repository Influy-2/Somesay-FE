import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiKey, fetchClient, unwrapApiData } from '@/shared/api';
import { useSnackbarStore } from '@/shared/stores';

// 프로필 이미지를 multipart 로 올립니다. 응답: 새 이미지 URL
const patchUserProfileImage = (profileImage: File) =>
  unwrapApiData(
    fetchClient.PATCH('/api/v1/users/profile-image', {
      // 생성기가 binary 파트를 string 으로 만들어 File 을 그대로 넣을 수 없습니다.
      // 실제 전송 값은 아래 bodySerializer 가 FormData 로 만듭니다.
      body: { profileImage: profileImage.name },
      bodySerializer: () => {
        const formData = new FormData();
        formData.append('profileImage', profileImage);
        return formData;
      },
    })
  );

// 프로필 이미지를 변경합니다.
export const usePatchUserProfileImage = () => {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

  const { mutate, isPending } = useMutation({
    mutationFn: patchUserProfileImage,
    retry: false,
    onSuccess: () => {
      showSnackbar('프로필 이미지를 변경했어요.');
      // 프로필 이미지는 /users/info와 /users/mypage 양쪽에 실려 있어 둘 다 갱신합니다.
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: apiKey('/api/v1/users/info'),
        }),
        queryClient.invalidateQueries({
          queryKey: apiKey('/api/v1/users/mypage'),
        }),
      ]);
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
