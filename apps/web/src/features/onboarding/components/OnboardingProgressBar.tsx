import { useEffect, useState } from 'react';
import {
  ONBOARDING_PROGRESS_STEP_COUNT,
  ONBOARDING_PROGRESS_STEPS,
  type OnboardingProgressStep,
} from '../constants/onboarding.constants';

interface OnboardingProgressBarProps {
  currentStep: OnboardingProgressStep;
}

let previousStepNumber: number | null = null;

const getPercentage = (stepNumber: number) =>
  (stepNumber / ONBOARDING_PROGRESS_STEP_COUNT) * 100;

export const OnboardingProgressBar = ({
  currentStep,
}: OnboardingProgressBarProps) => {
  const currentStepNumber = ONBOARDING_PROGRESS_STEPS.indexOf(currentStep) + 1;
  const targetPercentage = getPercentage(currentStepNumber);
  const [displayedPercentage, setDisplayedPercentage] = useState(() =>
    previousStepNumber === null
      ? targetPercentage
      : getPercentage(previousStepNumber)
  );

  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      setDisplayedPercentage(targetPercentage);
      previousStepNumber = currentStepNumber;
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [currentStepNumber, targetPercentage]);

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
