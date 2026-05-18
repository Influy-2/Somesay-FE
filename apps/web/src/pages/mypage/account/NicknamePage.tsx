import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PageHeader, InputField } from '@/shared/components';
import { ArrowBackIcon } from '@/shared/icons';
import {
  MOCK_ACCOUNT,
  MOCK_USERS,
} from '@/features/myPage/components/mockData';

export const NicknamePage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState(MOCK_ACCOUNT.nickname);
  const [errorMessage, setErrorMessage] = useState('');

  const isDuplicate = MOCK_USERS.some(
    (user) => user.nickname === nickname && nickname !== MOCK_ACCOUNT.nickname
  );
  const isChanged = nickname !== MOCK_ACCOUNT.nickname;
  const isValid =
    isChanged &&
    !isDuplicate &&
    nickname.length >= 1 &&
    /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]*$/.test(nickname);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length > 12) return;

    setNickname(value);

    if (value && !/^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]*$/.test(value)) {
      setErrorMessage('닉네임은 한글, 영문, 숫자만 입력할 수 있어요.');
    } else if (
      MOCK_USERS.some(
        (user) => user.nickname === value && value !== MOCK_ACCOUNT.nickname
      )
    ) {
      setErrorMessage('이미 사용 중인 닉네임입니다.');
    } else {
      setErrorMessage('');
    }
  };

  const handleComplete = () => {
    if (!isValid) return;
    // TODO: API 연결 후 닉네임 변경 로직 추가
    navigate(-1);
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
        <InputField
          value={nickname}
          onChange={handleChange}
          placeholder="닉네임을 입력해주세요"
          maxLength={12}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
};
