import { useEffect, useState } from 'react';
import {
  ONBOARDING_PROGRESS_STEP_COUNT,
  ONBOARDING_PROGRESS_STEPS,
  type OnboardingProgressStep,
} from '../constants/onboarding.constants';
import { useOnboardingStore } from '../stores/onboarding.store';

interface OnboardingProgressBarProps {
  currentStep: OnboardingProgressStep;
}

const getPercentage = (stepNumber: number) =>
  (stepNumber / ONBOARDING_PROGRESS_STEP_COUNT) * 100;

export const OnboardingProgressBar = ({
  currentStep,
}: OnboardingProgressBarProps) => {
  const previousProgressStep = useOnboardingStore(
    (state) => state.previousProgressStep
  );
  const setPreviousProgressStep = useOnboardingStore(
    (state) => state.setPreviousProgressStep
  );
  const currentStepNumber = ONBOARDING_PROGRESS_STEPS.indexOf(currentStep) + 1;
  const previousStepNumber = previousProgressStep
    ? ONBOARDING_PROGRESS_STEPS.indexOf(previousProgressStep) + 1
    : null;
  const targetPercentage = getPercentage(currentStepNumber);
  const [displayedPercentage, setDisplayedPercentage] = useState(() =>
    previousStepNumber === null
      ? targetPercentage
      : getPercentage(previousStepNumber)
  );

  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      setDisplayedPercentage(targetPercentage);
      setPreviousProgressStep(currentStep);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [currentStep, setPreviousProgressStep, targetPercentage]);

  return (
    <div
      className="bg-grey02 h-1 w-full"
      role="progressbar"
      aria-label="회원가입 진행률"
      aria-valuenow={currentStepNumber}
      aria-valuemin={1}
      aria-valuemax={ONBOARDING_PROGRESS_STEP_COUNT}
      aria-valuetext={`${currentStepNumber}/${ONBOARDING_PROGRESS_STEP_COUNT}단계`}
    >
      <div
        className="bg-grey08 h-full transition-[width] duration-500 ease-out motion-reduce:transition-none"
        style={{ width: `${displayedPercentage}%` }}
      />
    </div>
  );
};
