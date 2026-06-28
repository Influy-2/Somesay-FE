// 모든 온보딩 페이지가 공유할 화면 골격
import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { CTAButton } from '@/shared/components';
import { PATH } from '@/routes/path';
import { useOnboardingStore } from '../store/onboarding.store';
import { OnboardingExitDialog } from './OnboardingExitDialog';
import {
  OnboardingHeader,
  type OnboardingHeaderVariant,
} from './OnboardingHeader';

interface OnboardingLayoutProps {
  headerVariant: OnboardingHeaderVariant;
  children: ReactNode;
  onBack?: () => void;
  onSkip?: () => void;
  cta?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
}

export const OnboardingLayout = ({
  headerVariant,
  children,
  onBack,
  onSkip,
  cta,
}: OnboardingLayoutProps) => {
  const navigate = useNavigate();
  const reset = useOnboardingStore((state) => state.reset);
  const [isExitDialogOpen, setIsExitDialogOpen] = useState(false);

  const handleExit = () => {
    reset();
    setIsExitDialogOpen(false);
    navigate(PATH.LOGIN.BASE, { replace: true });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col pt-13.5">
      <OnboardingHeader
        variant={headerVariant}
        onBack={onBack ?? (() => navigate(-1))}
        onExit={() => setIsExitDialogOpen(true)}
        {...(onSkip ? { onSkip } : {})}
      />

      <div className={cta ? 'flex-1 px-4 py-8 pb-28' : 'flex-1 px-4 py-8'}>
        {children}
      </div>

      {cta && (
        <div className="z-header fixed bottom-0 left-1/2 w-full max-w-110 min-w-[20rem] -translate-x-1/2 bg-white px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <CTAButton
            label={cta.label}
            onClick={cta.onClick}
            {...(cta.disabled === undefined ? {} : { disabled: cta.disabled })}
          />
        </div>
      )}

      <OnboardingExitDialog
        isOpen={isExitDialogOpen}
        onCancel={() => setIsExitDialogOpen(false)}
        onExit={handleExit}
      />
    </div>
  );
};
