// 소셜 로그인 버튼 페이지
import {
  SOCIAL_PROVIDERS,
  SOCIAL_PROVIDER_LABELS,
  SocialLoginButton,
  type SocialProvider,
} from '@/features/auth';
import { ArrowBackIcon } from '@/shared/icons';
import { useSocialAuthFlow } from '@/app/hooks/useSocialAuthFlow';
import { useNavigate } from 'react-router';
export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useSocialAuthFlow();

  const handleProviderSelect = (provider: SocialProvider) => {
    void login(provider);
  };

  return (
    <div className="bg-primary-300 flex min-h-full flex-1 flex-col justify-between pb-[1.875rem]">
      <header className="flex h-[3.375rem] items-center self-stretch px-4 py-2.5">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="뒤로 가기"
          className="flex size-9 items-center justify-center"
        >
          <ArrowBackIcon />
        </button>
      </header>
      <div className="flex flex-col gap-3 px-4">
        {SOCIAL_PROVIDERS.map((provider) => (
          <SocialLoginButton
            key={provider}
            provider={provider}
            label={`${SOCIAL_PROVIDER_LABELS[provider]}로 시작하기`}
            onClick={handleProviderSelect}
          />
        ))}
      </div>
    </div>
  );
};
