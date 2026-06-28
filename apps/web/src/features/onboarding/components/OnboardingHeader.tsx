import type { ReactNode } from 'react';
import { PageHeader } from '@/shared/components';
import { ArrowBackIcon, X24Icon } from '@/shared/icons';

export type OnboardingHeaderVariant = 'terms' | 'signup';

interface OnboardingHeaderProps {
  variant: OnboardingHeaderVariant;
  onBack: () => void;
  onExit: () => void;
  onSkip?: () => void;
}

const HeaderIconButton = ({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className="flex size-9 cursor-pointer items-center justify-center"
  >
    {children}
  </button>
);

export const OnboardingHeader = ({
  variant,
  onBack,
  onExit,
  onSkip,
}: OnboardingHeaderProps) => {
  const exitButton = (
    <HeaderIconButton label="회원가입 종료" onClick={onExit}>
      <X24Icon />
    </HeaderIconButton>
  );

  if (variant === 'terms') {
    return (
      <PageHeader
        title="약관 동의"
        left={
          <HeaderIconButton label="이전 화면으로 이동" onClick={onBack}>
            <ArrowBackIcon />
          </HeaderIconButton>
        }
        right={[exitButton]}
      />
    );
  }

  return (
    <PageHeader
      title="회원가입"
      left={exitButton}
      {...(onSkip
        ? {
            right: [
              <button
                type="button"
                onClick={onSkip}
                className="body1-sb text-black"
              >
                건너뛰기
              </button>,
            ],
          }
        : {})}
    />
  );
};
