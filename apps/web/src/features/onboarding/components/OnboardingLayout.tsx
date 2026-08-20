// 모든 온보딩 페이지가 공유할 화면 골격
import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { CTAButton } from '@/shared/components';
import { PATH } from '@/routes/path';
import cn from '@/utils/cn';
import { useCompleteOnboarding } from '../hooks/useCompleteOnboarding';
import { useOnboardingStore } from '../stores/onboarding.store';
import { isOnboardingCompletionAvailable } from '../utils/onboarding.completion';
import { OnboardingCompleteDialog } from './OnboardingCompleteDialog';
import { OnboardingExitDialog } from './OnboardingExitDialog';
import {
  OnboardingHeader,
  type OnboardingHeaderVariant,
} from './OnboardingHeader';
import type { OnboardingProgressStep } from '../constants/onboarding.constants';

interface OnboardingLayoutProps {
  headerVariant: OnboardingHeaderVariant;
  progressStep?: OnboardingProgressStep;
  children: ReactNode;
  footerContent?: ReactNode;
  onBack?: () => void;
  onSkip?: () => void;
  contentClassName?: string;
  cta?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    showPrevious: boolean;
  };
}

export const OnboardingLayout = ({
  headerVariant,
  progressStep,
  children,
  footerContent,
  onBack,
  onSkip,
  contentClassName,
  cta,
}: OnboardingLayoutProps) => {
  const navigate = useNavigate();
  const reset = useOnboardingStore((state) => state.reset);
  const canCompleteOnClose = useOnboardingStore(
    isOnboardingCompletionAvailable
  );
  const { completeOnboarding, isPending } = useCompleteOnboarding();
  const [isCloseDialogOpen, setIsCloseDialogOpen] = useState(false);

  const handleExit = () => {
    reset();
    setIsCloseDialogOpen(false);
    navigate(PATH.LOGIN.BASE, { replace: true });
  };

  const handleComplete = () => {
    void completeOnboarding();
  };

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col pt-13.5">
      <OnboardingHeader
        variant={headerVariant}
        onBack={onBack ?? (() => navigate(-1))}
        onExit={() => setIsCloseDialogOpen(true)}
        {...(progressStep ? { progressStep } : {})}
        {...(onSkip ? { onSkip } : {})}
      />

      <div
        className={cn(
          cta
            ? footerContent
              ? 'flex-1 px-4 py-8'
              : 'flex-1 px-4 py-8 pb-28'
            : 'flex-1 px-4 py-8',
          contentClassName
        )}
      >
        {children}
      </div>

      {cta && (
        <div className="z-header fixed bottom-0 left-1/2 w-full max-w-110 min-w-[20rem] -translate-x-1/2 bg-white">
          {footerContent}
          <div className="flex gap-2 px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
            {cta.showPrevious && (
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="body1-sb border-grey04 h-12 w-1/3 shrink-0 cursor-pointer border"
              >
                이전
              </button>
            )}
            <CTAButton
              label={cta.label}
              onClick={cta.onClick}
              {...(cta.disabled === undefined
                ? {}
                : { disabled: cta.disabled })}
            />
          </div>
        </div>
      )}

      {canCompleteOnClose ? (
        <OnboardingCompleteDialog
          isOpen={isCloseDialogOpen}
          isSubmitting={isPending}
          onCancel={() => setIsCloseDialogOpen(false)}
          onComplete={handleComplete}
        />
      ) : (
        <OnboardingExitDialog
          isOpen={isCloseDialogOpen}
          onCancel={() => setIsCloseDialogOpen(false)}
          onExit={handleExit}
        />
      )}
    </div>
  );
};
