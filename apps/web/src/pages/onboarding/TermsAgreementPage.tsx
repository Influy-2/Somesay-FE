import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  agreementsSchema,
  AgreementCheckbox,
  getNextOnboardingPath,
  ONBOARDING_AGREEMENTS,
  OnboardingLayout,
  useOnboardingStore,
} from '@/features/onboarding';
import { ChevronRight20Icon } from '@/shared/icons';

export const TermsAgreementPage = () => {
  const navigate = useNavigate();
  const savedAgreements = useOnboardingStore((state) => state.agreements);
  const [agreements, setLocalAgreements] = useState(savedAgreements);
  const setAgreements = useOnboardingStore((state) => state.setAgreements);
  const markStepComplete = useOnboardingStore(
    (state) => state.markStepComplete
  );

  const isAllAgreed = ONBOARDING_AGREEMENTS.every(({ id }) => agreements[id]);
  const canProceed = agreementsSchema.safeParse(agreements).success;

  const handleAllAgreementsChange = () => {
    const nextAgreed = !isAllAgreed;
    const nextAgreements = Object.fromEntries(
      ONBOARDING_AGREEMENTS.map(({ id }) => [id, nextAgreed])
    );

    setLocalAgreements(nextAgreements);
  };

  const handleAgreementDetails = () => {};

  const handleNext = () => {
    if (!agreementsSchema.safeParse(agreements).success) return;

    setAgreements(agreements);
    markStepComplete('terms');
    navigate(getNextOnboardingPath('terms'));
  };

  return (
    <OnboardingLayout
      headerVariant="terms"
      cta={{
        label: '다음',
        onClick: handleNext,
        disabled: !canProceed,
        showPrevious: false,
      }}
    >
      <div className="flex flex-col gap-10 pt-3.5">
        <h1 className="headline4 whitespace-pre-line">
          {'SOMESAY에\n오신 것을 환영합니다!'}
        </h1>

        <section className="flex flex-col gap-3.5" aria-label="약관 동의 항목">
          <AgreementCheckbox
            checked={isAllAgreed}
            label="약관 전체 동의"
            onChange={handleAllAgreementsChange}
            labelClassName="body1-b"
          />

          <div className="border-grey03 border-t" />

          {ONBOARDING_AGREEMENTS.map(({ id, label }) => (
            <div key={id} className="flex items-center gap-3">
              <AgreementCheckbox
                checked={Boolean(agreements[id])}
                label={label}
                onChange={() =>
                  setLocalAgreements((currentAgreements) => ({
                    ...currentAgreements,
                    [id]: !currentAgreements[id],
                  }))
                }
                labelClassName="body1-m"
                className="flex-1"
              />
              <button
                type="button"
                onClick={handleAgreementDetails}
                aria-label={`${label} 보기`}
                className="flex size-6 shrink-0 items-center justify-center"
              >
                <ChevronRight20Icon />
              </button>
            </div>
          ))}
        </section>
      </div>
    </OnboardingLayout>
  );
};
