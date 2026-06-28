// 모든 온보딩 페이지가 공유할 화면 골격
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { CTAButton, PageHeader } from '@/shared/components';
import { ArrowBackIcon } from '@/shared/icons';

interface OnboardingLayoutProps {
  title?: string;
  children: ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
  rightAction?: ReactNode;
  cta?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
}

export const OnboardingLayout = ({
  title,
  children,
  showBackButton = true,
  onBack,
  rightAction,
  cta,
}: OnboardingLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-full flex-1 flex-col pt-13.5">
      <PageHeader
        {...(title ? { title } : {})}
        {...(showBackButton
          ? {
              left: (
                <button
                  type="button"
                  onClick={onBack ?? (() => navigate(-1))}
                  aria-label="이전 단계로 이동"
                >
                  <ArrowBackIcon />
                </button>
              ),
            }
          : {})}
        {...(rightAction ? { right: [rightAction] } : {})}
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
    </div>
  );
};
