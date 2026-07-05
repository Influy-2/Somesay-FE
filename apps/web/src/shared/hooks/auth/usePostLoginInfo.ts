import { postLoginInfo } from '@somesay/shared';
import { useMutation } from '@tanstack/react-query';

// 회원가입 기본 정보 저장 요청을 처리하는 mutation hook입니다.
export const usePostLoginInfo = () =>
  useMutation({
    mutationFn: postLoginInfo,
    retry: false,
  });
