import { useNavigate } from 'react-router';
import { USER_SKIN_TYPE_OPTIONS } from '@somesay/shared';
import {
  getNextOnboardingPath,
  OnboardingLayout,
  OnboardingOptionGroup,
  skinTypeNamesSchema,
  useOnboardingStore,
} from '@/features/onboarding';

const SKIN_TYPE_OPTIONS = USER_SKIN_TYPE_OPTIONS.map(
  ({ label }) => [label, label] as const
);

export const SkinTypesPage = () => {
  const navigate = useNavigate();
  const skinTypeNames = useOnboardingStore((state) => state.skinTypeNames);
  const toggleSkinTypeName = useOnboardingStore(
    (state) => state.toggleSkinTypeName
  );
  const canProceed = skinTypeNamesSchema.safeParse(skinTypeNames).success;

  const handleNext = () => {
    if (!canProceed) return;

    const store = useOnboardingStore.getState();
    store.markStepComplete('skinTypes');
    navigate(getNextOnboardingPath('skinTypes'));
  };

  return (
    <OnboardingLayout
      headerVariant="signup"
      progressStep="skinTypes"
      cta={{
        label: '다음',
        onClick: handleNext,
        disabled: !canProceed,
        showPrevious: true,
      }}
    >
      <div className="flex flex-col gap-10 pt-3.5">
        <h1 className="headline4">피부 타입을 선택해 주세요</h1>

        <OnboardingOptionGroup
          helperText="최대 2개 선택"
          options={SKIN_TYPE_OPTIONS}
          selectedValue={skinTypeNames}
          onSelect={toggleSkinTypeName}
        />
      </div>
    </OnboardingLayout>
  );
};
