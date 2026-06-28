import { useNavigate } from 'react-router';
import {
  buildProductFitPayloads,
  buildSignupPayload,
  getNextOnboardingPath,
  OnboardingLayout,
  ONBOARDING_STEP_LABELS,
  OPTIONAL_ONBOARDING_STEPS,
  REQUIRED_AGREEMENT_IDS,
  useOnboardingStore,
  type OnboardingStep,
} from '@/features/onboarding';
import { PATH } from '@/routes/path';

interface OnboardingPlaceholderPageProps {
  step: OnboardingStep;
}

export const OnboardingPlaceholderPage = ({
  step,
}: OnboardingPlaceholderPageProps) => {
  const navigate = useNavigate();
  const store = useOnboardingStore();
  const isOptional = OPTIONAL_ONBOARDING_STEPS.includes(step);

  const moveToNextStep = () => {
    const currentStore = useOnboardingStore.getState();

    if (!currentStore.provider) {
      navigate(PATH.LOGIN.BASE, { replace: true });
      return;
    }

    navigate(getNextOnboardingPath(currentStore.provider, step));
  };

  const markCurrentStepComplete = () => {
    const actions = useOnboardingStore.getState();

    switch (step) {
      case 'terms':
        REQUIRED_AGREEMENT_IDS.forEach((agreementId) => {
          actions.setAgreement(agreementId, true);
        });
        break;
      case 'email':
        actions.setEmail('onboarding@somesay.dev');
        break;
      case 'emailVerification':
        actions.markEmailVerified();
        break;
      case 'nickname':
        actions.setNickname('somesay_user');
        break;
      case 'profile':
        actions.setProfile('FEMALE', 'TWENTIES');
        break;
      case 'skinTypes':
        if (actions.skinTypeNames.length === 0) {
          actions.toggleSkinTypeName('건성');
        }
        break;
      case 'skinConcerns':
        if (actions.concerns.length === 0) {
          actions.toggleConcern('보습');
        }
        break;
      case 'matchedProducts':
        if (actions.matchedProductIds.length === 0) {
          actions.toggleProduct('MATCHED', 1);
        }
        break;
      case 'mismatchedProducts':
        if (actions.mismatchedProductIds.length === 0) {
          actions.toggleProduct('MISMATCHED', 2);
        }
        break;
      case 'complete':
        actions.reset();
        navigate(PATH.ROOT, { replace: true });
        return;
    }

    useOnboardingStore.getState().markStepComplete(step);
    moveToNextStep();
  };

  const skipCurrentStep = () => {
    useOnboardingStore.getState().markStepComplete(step);
    moveToNextStep();
  };

  const payloadPreview =
    step === 'complete'
      ? {
          signup: buildSignupPayload(store),
          productFits: buildProductFitPayloads(store),
        }
      : null;

  return (
    <OnboardingLayout
      title={ONBOARDING_STEP_LABELS[step]}
      rightAction={
        isOptional ? (
          <button
            type="button"
            onClick={skipCurrentStep}
            className="body1-sb text-black"
          >
            건너뛰기
          </button>
        ) : undefined
      }
      cta={{
        label:
          step === 'complete' ? '임시 온보딩 종료' : '임시 값 저장 후 다음',
        onClick: markCurrentStepComplete,
      }}
    >
      <div className="flex flex-col gap-5">
        <div className="bg-grey01 flex flex-col gap-2 p-4">
          <h1 className="headline4">{ONBOARDING_STEP_LABELS[step]}</h1>
          <p className="body2-m text-grey06">
            Figma 전달 전 라우팅과 상태 흐름을 검증하기 위한 임시 화면입니다.
          </p>
        </div>

        {payloadPreview && (
          <pre className="body2-m bg-grey01 overflow-x-auto p-4 whitespace-pre-wrap">
            {JSON.stringify(payloadPreview, null, 2)}
          </pre>
        )}
      </div>
    </OnboardingLayout>
  );
};
