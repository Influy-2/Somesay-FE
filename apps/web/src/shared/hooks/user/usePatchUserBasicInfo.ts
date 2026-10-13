import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { BasicInfoRequest } from '@somesay/shared';

import { apiKey, fetchClient, unwrapApiData } from '@/shared/api';
import { useSnackbarStore } from '@/shared/stores';
import { useFetchUserInfo } from './useFetchUserInfo';

interface UpdateBasicInfoOptions {
  onSuccess?: () => void;
}

const showUpdateError = () =>
  useSnackbarStore
    .getState()
    .showSnackbar('정보를 수정하지 못했어요. 잠시 후 다시 시도해 주세요.', {
      variant: 'error',
    });

// 닉네임·성별·연령 중 바꾼 값만 받아 기본 정보를 수정합니다.
export const usePatchUserBasicInfo = () => {
  const queryClient = useQueryClient();
  const { data: userInfo } = useFetchUserInfo();

  const { mutate, isPending } = useMutation({
    mutationFn: (body: BasicInfoRequest) =>
      unwrapApiData(fetchClient.PATCH('/api/v1/users/basic-info', { body })),
    retry: false,
    // 닉네임·성별은 /users/info와 /users/mypage 양쪽에 실려 있어 둘 다 갱신합니다.
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
    onError: showUpdateError,
  });

  const updateBasicInfo = (
    patch: Partial<BasicInfoRequest>,
    { onSuccess }: UpdateBasicInfoOptions = {}
  ) => {
    if (!userInfo) return;

    // 스펙상 세 필드가 모두 필수라, 바꾸지 않은 값도 현재 값으로 채워 전부 보냅니다.
    const userNickname = patch.userNickname ?? userInfo.userNickname;
    const userGender = patch.userGender ?? userInfo.userGender;
    const userAge = patch.userAge ?? userInfo.userAge;

    // TODO: 서버는 null을 "유지"로 받는다고 설명하지만 요청 스펙이 non-null이라 보낼 수 없습니다.
    // 백엔드에 BasicInfoRequest nullable 표시를 요청했고, 회신 전까지는 빈 값이 있으면 막습니다.
    if (userNickname === null || userGender === null || userAge === null) {
      showUpdateError();
      return;
    }

    mutate(
      { userNickname, userGender, userAge },
      { onSuccess: () => onSuccess?.() }
    );
  };

  return { updateBasicInfo, isPending };
};
