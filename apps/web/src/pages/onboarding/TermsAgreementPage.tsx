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
import { PATH } from '@/routes/path';

export const TermsAgreementPage = () => {
  const navigate = useNavigate();
  const agreements = useOnboardingStore((state) => state.agreements);
  const setAgreement = useOnboardingStore((state) => state.setAgreement);
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

    setAgreements(nextAgreements);
  };

  const handleAgreementDetails = (agreementId: string) => {
    console.info('[TermsAgreementPage] view agreement', agreementId);
  };

  const handleNext = () => {
    if (!agreementsSchema.safeParse(agreements).success) return;

    const { provider } = useOnboardingStore.getState();
    if (!provider) {
      navigate(PATH.LOGIN.BASE, { replace: true });
      return;
    }

    markStepComplete('terms');
    navigate(getNextOnboardingPath(provider, 'terms'));
  };

  return (
    <OnboardingLayout
      headerVariant="terms"
      cta={{
        label: '다음',
        onClick: handleNext,
        disabled: !canProceed,
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
                onChange={() => setAgreement(id, !agreements[id])}
                labelClassName="body1-m"
                className="flex-1"
              />
              <button
                type="button"
                onClick={() => handleAgreementDetails(id)}
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
