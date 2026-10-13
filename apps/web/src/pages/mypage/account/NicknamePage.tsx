import { useState } from 'react';
import { useNavigate } from 'react-router';
import { CharacterCountInput, PageHeader } from '@/shared/components';
import { ArrowBackIcon } from '@/shared/icons';
import { useAuth, usePatchUserBasicInfo } from '@/shared/hooks';
import { NICKNAME_MAX_LENGTH, nicknameSchema } from '@/shared/schemas';

export const NicknamePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { updateBasicInfo, isPending } = usePatchUserBasicInfo();
  const currentNickname = user?.nickname ?? '';
  const [nickname, setNickname] = useState(currentNickname);

  const nicknameResult = nicknameSchema.safeParse(nickname);
  const errorMessage =
    nickname.length > 0 && !nicknameResult.success
      ? (nicknameResult.error.issues[0]?.message ?? '')
      : '';
  const isValid =
    nicknameResult.success &&
    nicknameResult.data !== currentNickname &&
    !isPending;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length > NICKNAME_MAX_LENGTH) return;

    setNickname(value);
  };

  const handleComplete = () => {
    if (!nicknameResult.success || !isValid) return;
    updateBasicInfo(
      { nickname: nicknameResult.data },
      { onSuccess: () => navigate(-1) }
    );
  };

  return (
    <div className="mt-13.5 flex flex-col">
      <PageHeader
        left={
          <button type="button" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </button>
        }
        title="닉네임"
        right={[
          <button
            key="complete"
            type="button"
            onClick={handleComplete}
            disabled={!isValid}
            className={`body1-sb ${isValid ? 'text-black' : 'text-grey04'}`}
          >
            완료
          </button>,
        ]}
      />
      <div className="px-4 pt-10">
        <CharacterCountInput
          value={nickname}
          onChange={handleChange}
          placeholder="닉네임을 입력해주세요"
          maxLength={NICKNAME_MAX_LENGTH}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
};
