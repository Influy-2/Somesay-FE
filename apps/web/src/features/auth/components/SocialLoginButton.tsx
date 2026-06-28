import type { SocialProvider } from '../schemas/auth.schema';
import { GoogleIcon, KakaoIcon, NaverIcon } from '@/shared/icons';
import cn from '@/utils/cn';
import type { ComponentType, SVGProps } from 'react';

type SocialProviderIcon = ComponentType<SVGProps<SVGSVGElement>>;

const SOCIAL_PROVIDER_ICONS: Record<SocialProvider, SocialProviderIcon> = {
  KAKAO: KakaoIcon,
  NAVER: NaverIcon,
  GOOGLE: GoogleIcon,
};

interface SocialLoginButtonProps {
  provider: SocialProvider;
  label: string;
  onClick: (provider: SocialProvider) => void;
}

export const SocialLoginButton = ({
  provider,
  label,
  onClick,
}: SocialLoginButtonProps) => {
  const Icon = SOCIAL_PROVIDER_ICONS[provider];

  return (
    <button
      type="button"
      onClick={() => onClick(provider)}
      className={cn(
        'body2-sb b flex h-12 min-h-12 w-full items-center justify-center gap-2.5 px-4 py-3',
        provider === 'KAKAO' && 'bg-[#FEE500] text-black',
        provider === 'NAVER' && 'bg-[#03C75A] text-white',
        provider === 'GOOGLE' && 'bg-white text-[#565656]'
      )}
    >
      <Icon aria-hidden="true" className="shrink-0" />
      {label}
    </button>
  );
};
