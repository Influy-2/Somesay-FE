import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  emailSchema,
  getNextOnboardingPath,
  OnboardingLayout,
  useOnboardingStore,
} from '@/features/onboarding';
import { PATH } from '@/routes/path';
import { OnboardingEmailInput } from '@/shared/components';

const EMAIL_DOMAINS = ['gmail.com', 'naver.com', 'daum.net', 'nate.com'];

const createEmailSuggestions = (value: string) => {
  const trimmedValue = value.trim();
  if (!trimmedValue || trimmedValue.includes('@')) return [];

  return EMAIL_DOMAINS.map((domain) => `${trimmedValue}@${domain}`);
};

export const EmailPage = () => {
  const navigate = useNavigate();
  const savedEmail = useOnboardingStore((state) => state.email);
  const [email, setLocalEmail] = useState(savedEmail);
  const [hasBlurred, setHasBlurred] = useState(false);
  const setEmail = useOnboardingStore((state) => state.setEmail);
  const markStepComplete = useOnboardingStore(
    (state) => state.markStepComplete
  );
  const emailResult = emailSchema.safeParse(email);
  const suggestions = useMemo(() => createEmailSuggestions(email), [email]);
  const errorMessage =
    hasBlurred && email.length > 0 && !emailResult.success
      ? emailResult.error.issues[0]?.message
      : undefined;

  const handleNext = () => {
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setHasBlurred(true);
      return;
    }

    const { provider } = useOnboardingStore.getState();
    if (!provider) {
      navigate(PATH.LOGIN.BASE, { replace: true });
      return;
    }

    setEmail(result.data);
    markStepComplete('email');
    navigate(getNextOnboardingPath('email'));
  };

  return (
    <OnboardingLayout
      headerVariant="signup"
      cta={{
        label: '다음',
        onClick: handleNext,
        disabled: !emailResult.success,
        showPrevious: false,
      }}
    >
      <div className="flex flex-col gap-7 pt-3.5">
        <h1 className="headline4">이메일을 입력해 주세요</h1>

        <OnboardingEmailInput
          value={email}
          onChange={(event) => {
            setLocalEmail(event.target.value);
            setHasBlurred(false);
          }}
          onBlur={() => setHasBlurred(true)}
          onSuggestionSelect={(suggestion) => {
            setLocalEmail(suggestion);
            setHasBlurred(false);
          }}
          suggestions={suggestions}
          {...(errorMessage ? { errorMessage } : {})}
          placeholder="이메일을 입력해 주세요"
          autoFocus
        />
      </div>
    </OnboardingLayout>
  );
};
