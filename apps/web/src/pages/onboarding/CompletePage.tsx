import { useEffect, useState } from 'react';
import {
  Navigate,
  useBlocker,
  useLocation,
  useNavigate,
  useNavigationType,
} from 'react-router';
import { OnboardingCompleteBottomSheet } from '@/features/onboarding/components/OnboardingCompleteBottomSheet';
import {
  isOnboardingCompleteEntry,
  useOnboardingStore,
} from '@/features/onboarding';
import { PATH } from '@/routes/path';
import { CTAButton, PageHeader } from '@/shared/components';
import { SomesayIcon, X24Icon } from '@/shared/icons';

export const CompletePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const resetOnboarding = useOnboardingStore((state) => state.reset);
  const [isValidEntry] = useState(() =>
    isOnboardingCompleteEntry(location.state, navigationType)
  );
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const blocker = useBlocker(
    ({ historyAction }) => isValidEntry && historyAction === 'POP'
  );

  useEffect(() => {
    if (isValidEntry) {
      resetOnboarding();
    }
  }, [isValidEntry, resetOnboarding]);

  useEffect(() => {
    if (blocker.state === 'blocked') {
      window.location.replace(PATH.LOGIN.BASE);
    }
  }, [blocker.state]);

  if (!isValidEntry) {
    return <Navigate to={PATH.ROOT} replace />;
  }

  const handleExit = () => {
    navigate(PATH.LOGIN.BASE, { replace: true });
  };

  return (
    <>
      <div className="relative flex min-h-full flex-1 flex-col bg-white">
        <PageHeader
          title="회원가입"
          left={
            <button
              type="button"
              onClick={handleExit}
              aria-label="로그인 화면으로 이동"
              className="flex size-9 cursor-pointer items-center justify-center"
            >
              <X24Icon />
            </button>
          }
        />

        <section className="absolute inset-0 flex items-center justify-center px-4">
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="headline1 text-grey-black">가입 완료!</h1>
            <div className="flex items-center gap-0.5">
              <SomesayIcon aria-hidden="true" />
              <p className="subhead-sb text-black">에 오신 걸 환영해요</p>
            </div>
          </div>
        </section>

        <div className="z-header fixed bottom-0 left-1/2 w-full max-w-110 min-w-[20rem] -translate-x-1/2 bg-white px-4 pt-2 pb-[max(1.875rem,env(safe-area-inset-bottom))]">
          <CTAButton label="완료" onClick={() => setIsBottomSheetOpen(true)} />
        </div>
      </div>
      <OnboardingCompleteBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
      />
    </>
  );
};
