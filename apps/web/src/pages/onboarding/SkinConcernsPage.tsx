import { useNavigate } from 'react-router';
import { USER_SKIN_CONCERN_OPTIONS } from '@somesay/shared';
import {
  concernsSchema,
  getNextOnboardingPath,
  OnboardingLayout,
  OnboardingOptionGroup,
  useOnboardingStore,
} from '@/features/onboarding';
import { PATH } from '@/routes/path';

const CONCERN_OPTIONS = USER_SKIN_CONCERN_OPTIONS.map(
  ({ label }) => [label, label] as const
);

export const SkinConcernsPage = () => {
  const navigate = useNavigate();
  const concerns = useOnboardingStore((state) => state.concerns);
  const toggleConcern = useOnboardingStore((state) => state.toggleConcern);
  const canProceed =
    concerns.length > 0 && concernsSchema.safeParse(concerns).success;

  const moveToNextStep = () => {
    const store = useOnboardingStore.getState();
    if (!store.provider) {
      navigate(PATH.LOGIN.BASE, { replace: true });
      return;
    }

    store.markStepComplete('skinConcerns');
    navigate(getNextOnboardingPath('skinConcerns'));
  };

  const handleNext = () => {
    if (canProceed) moveToNextStep();
  };

  return (
    <OnboardingLayout
      headerVariant="signup"
      progressStep="skinConcerns"
      onSkip={moveToNextStep}
      cta={{
        label: '다음',
        onClick: handleNext,
        disabled: !canProceed,
        showPrevious: true,
      }}
    >
      <div className="flex flex-col gap-10 pt-3.5">
        <h1 className="headline4">피부 고민을 선택해 주세요</h1>

        <OnboardingOptionGroup
          helperText="최대 2개 선택"
          options={CONCERN_OPTIONS}
          selectedValue={concerns}
          onSelect={toggleConcern}
        />
      </div>
    </OnboardingLayout>
  );
};
