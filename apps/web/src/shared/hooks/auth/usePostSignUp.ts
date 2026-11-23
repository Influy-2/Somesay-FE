import type { SignUpInfoRequest } from '@somesay/shared';
import { useMutation } from '@tanstack/react-query';
import { fetchClient, unwrapApiData } from '@/shared/api';

// 온보딩에서 받은 기본 정보로 회원가입을 완료합니다.
export const usePostSignUp = () =>
  useMutation({
    mutationFn: (signUpInfo: SignUpInfoRequest) =>
      unwrapApiData(
        fetchClient.POST('/api/v1/auth/signup', { body: signUpInfo })
      ),
    retry: false,
  });
