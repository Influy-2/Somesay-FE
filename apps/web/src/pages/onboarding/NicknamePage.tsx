import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  getNextOnboardingPath,
  nicknameSchema,
  OnboardingLayout,
  useOnboardingStore,
} from '@/features/onboarding';
import { CharacterCountInput } from '@/shared/components';
import { PATH } from '@/routes/path';

export const NicknamePage = () => {
  const navigate = useNavigate();
  const savedNickname = useOnboardingStore((state) => state.nickname);
  const [nickname, setLocalNickname] = useState(savedNickname);
  const setNickname = useOnboardingStore((state) => state.setNickname);
  const markStepComplete = useOnboardingStore(
    (state) => state.markStepComplete
  );

  const nicknameResult = nicknameSchema.safeParse(nickname);
  const errorMessage =
    nickname.length > 0 && !nicknameResult.success
      ? nicknameResult.error.issues[0]?.message
      : undefined;

  const handleNext = () => {
    const result = nicknameSchema.safeParse(nickname);
    if (!result.success) return;

    const { provider } = useOnboardingStore.getState();
    if (!provider) {
      navigate(PATH.LOGIN.BASE, { replace: true });
      return;
    }

    setNickname(result.data);
    markStepComplete('nickname');
    navigate(getNextOnboardingPath('nickname'));
  };

  return (
    <OnboardingLayout
      headerVariant="signup"
      progressStep="nickname"
      cta={{
        label: '다음',
        onClick: handleNext,
        disabled: !nicknameResult.success,
        showPrevious: false,
      }}
    >
      <div className="flex flex-col gap-10 pt-3.5">
        <h1 className="headline4">닉네임을 입력해 주세요</h1>

        <CharacterCountInput
          value={nickname}
          onChange={(event) => setLocalNickname(event.target.value)}
          {...(errorMessage ? { errorMessage } : {})}
          helperText="한글, 영어 소문자, 숫자로 구성된 닉네임을 입력해 주세요."
          autoComplete="nickname"
          allowLengthOverflow
          autoFocus
        />
      </div>
    </OnboardingLayout>
  );
};
