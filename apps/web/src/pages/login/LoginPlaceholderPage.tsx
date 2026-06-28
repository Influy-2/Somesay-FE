import { useNavigate } from 'react-router';
import {
  ONBOARDING_PATH_BY_STEP,
  OnboardingLayout,
  OnboardingSelectionButton,
  SOCIAL_PROVIDER_LABELS,
  useOnboardingStore,
  type SocialProvider,
} from '@/features/onboarding';

const PROVIDERS: SocialProvider[] = ['KAKAO', 'NAVER', 'GOOGLE'];

export const LoginPlaceholderPage = () => {
  const navigate = useNavigate();
  const selectProvider = useOnboardingStore((state) => state.selectProvider);

  const handleProviderSelect = (provider: SocialProvider) => {
    selectProvider(provider);
    navigate(ONBOARDING_PATH_BY_STEP.terms);
  };

  return (
    <OnboardingLayout title="로그인" showBackButton={false}>
      <div className="flex flex-col gap-8">
        <div className="bg-grey01 flex flex-col gap-2 p-4">
          <h1 className="headline4">온보딩 기반 구조 임시 화면</h1>
          <p className="body2-m text-grey06">
            실제 로그인 UI는 Figma 전달 후 구현합니다. 현재 버튼은 provider별
            라우팅 분기 확인용입니다.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {PROVIDERS.map((provider) => (
            <OnboardingSelectionButton
              key={provider}
              isSelected={false}
              onClick={() => handleProviderSelect(provider)}
            >
              {SOCIAL_PROVIDER_LABELS[provider]} 임시 시작
            </OnboardingSelectionButton>
          ))}
        </div>
      </div>
    </OnboardingLayout>
  );
};
