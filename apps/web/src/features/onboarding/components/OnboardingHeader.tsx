import type { ReactNode } from 'react';
import { PageHeader } from '@/shared/components';
import { ArrowBackIcon, X24Icon } from '@/shared/icons';
import type { OnboardingProgressStep } from '../constants/onboarding.constants';
import { OnboardingProgressBar } from './OnboardingProgressBar';

export type OnboardingHeaderVariant = 'terms' | 'signup';

interface OnboardingHeaderProps {
  variant: OnboardingHeaderVariant;
  onBack: () => void;
  onExit: () => void;
  onSkip?: () => void;
  progressStep?: OnboardingProgressStep;
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
  progressStep,
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
    <>
      <PageHeader
        title="회원가입"
        left={exitButton}
        {...(onSkip
          ? {
              right: [
                <button
                  type="button"
                  onClick={onSkip}
                  className="body2-sb text-grey05"
                >
                  건너뛰기
                </button>,
              ],
            }
          : {})}
      />
      {progressStep && (
        <div className="z-header fixed top-13.5 left-1/2 w-full max-w-110 min-w-[20rem] -translate-x-1/2 bg-white px-4 pt-2">
          <OnboardingProgressBar currentStep={progressStep} />
        </div>
      )}
    </>
  );
};
