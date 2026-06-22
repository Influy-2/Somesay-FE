import { useNavigate } from 'react-router';
import { PATH } from '@/routes/path';
import { PageHeader } from '@/shared/components';
import { ArrowBackIcon } from '@/shared/icons';
import { InfoSection } from '@/features/myPage/components/InfoSection';
import { InfoRow } from '@/features/myPage/components/InfoRow';
import { MOCK_ACCOUNT } from '@/features/myPage/components/mockData';
import { AccountProfileImage } from '@/features/myPage/components/AccountProfileImage';
import { ProductFitSection } from '@/features/myPage/components/ProductFitSection';

export const AccountPage = () => {
  const navigate = useNavigate();

  const {
    profileImageUrl,
    nickname,
    gender,
    age,
    skinTypes,
    skinConcerns,
    goodProducts,
    badProducts,
  } = MOCK_ACCOUNT;

  const ACCOUNT_BASE = `${PATH.MY_PAGE.BASE}/${PATH.MY_PAGE.ACCOUNT.BASE}`;
  const BASIC_INFO_ROWS = [
    {
      label: '닉네임',
      value: nickname,
      to: `${ACCOUNT_BASE}/${PATH.MY_PAGE.ACCOUNT.NICKNAME}`,
    },
    {
      label: '성별',
      value: gender,
      to: `${ACCOUNT_BASE}/${PATH.MY_PAGE.ACCOUNT.GENDER}`,
    },
    {
      label: '연령',
      value: age,
      to: `${ACCOUNT_BASE}/${PATH.MY_PAGE.ACCOUNT.AGE}`,
    },
  ];
  const SKIN_INFO_ROWS = [
    {
      label: '피부 타입',
      value: skinTypes.join(', '),
      to: `${ACCOUNT_BASE}/${PATH.MY_PAGE.ACCOUNT.SKIN_TYPE}`,
    },
    {
      label: '피부 고민',
      value: skinConcerns.join(', '),
      to: `${ACCOUNT_BASE}/${PATH.MY_PAGE.ACCOUNT.SKIN_CONCERN}`,
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <PageHeader
        left={
          <button type="button" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </button>
        }
        title="내 계정"
      />
      <div className="mt-13.5 flex flex-1 flex-col px-4 pb-4">
        {/* 프로필 이미지 */}
        <AccountProfileImage profileImageUrl={profileImageUrl} />

        <div className="divide-grey03 flex flex-col divide-y">
          {/* 기본 정보 수정 */}
          <InfoSection title="기본 정보 수정">
            {BASIC_INFO_ROWS.map((row) => (
              <InfoRow key={row.label} {...row} />
            ))}
          </InfoSection>
          {/* 피부 정보 수정 */}
          <InfoSection title="피부 정보 수정">
            {SKIN_INFO_ROWS.map((row) => (
              <InfoRow key={row.label} {...row} />
            ))}
          </InfoSection>
          {/* 제품 적합도 */}
          <ProductFitSection matches={goodProducts} mismatches={badProducts} />
          {/* 계정 설정 */}
          <InfoSection title="계정 설정">
            <InfoRow label="로그아웃" onClick={() => {}} />
            <InfoRow label="회원탈퇴" onClick={() => {}} />
          </InfoSection>
        </div>
      </div>
    </div>
  );
};
