import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  AGE_LABELS,
  GENDER_LABELS,
  getNextOnboardingPath,
  OnboardingLayout,
  OnboardingOptionGroup,
  useOnboardingStore,
  type OnboardingAge,
  type OnboardingGender,
} from '@/features/onboarding';
import { PATH } from '@/routes/path';

const GENDER_OPTIONS = Object.entries(GENDER_LABELS) as [
  OnboardingGender,
  string,
][];
const AGE_OPTIONS = Object.entries(AGE_LABELS) as [OnboardingAge, string][];

export const ProfilePage = () => {
  const navigate = useNavigate();
  const savedGender = useOnboardingStore((state) => state.gender);
  const savedAge = useOnboardingStore((state) => state.age);
  const [gender, setGender] = useState(savedGender);
  const [age, setAge] = useState(savedAge);

  const handleNext = () => {
    if (!gender || !age) return;

    const store = useOnboardingStore.getState();
    if (!store.provider) {
      navigate(PATH.LOGIN.BASE, { replace: true });
      return;
    }

    store.setProfile(gender, age);
    store.markStepComplete('profile');
    navigate(getNextOnboardingPath(store.provider, 'profile'));
  };

  return (
    <OnboardingLayout
      headerVariant="signup"
      cta={{
        label: '다음',
        onClick: handleNext,
        disabled: !gender || !age,
        showPrevious: true,
      }}
    >
      <div className="flex flex-col gap-10 pt-3.5">
        <h1 className="headline4">성별과 연령대를 선택해 주세요</h1>

        <div className="flex flex-col gap-8">
          <OnboardingOptionGroup
            title="성별"
            options={GENDER_OPTIONS}
            selectedValue={gender}
            onSelect={setGender}
          />
          <OnboardingOptionGroup
            title="연령대"
            options={AGE_OPTIONS}
            selectedValue={age}
            onSelect={setAge}
          />
        </div>
      </div>
    </OnboardingLayout>
  );
};
