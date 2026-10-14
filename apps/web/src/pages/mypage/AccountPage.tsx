import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PATH } from '@/routes/path';
import {
  getAgeLabel,
  getConcernLabels,
  getSkinTypeLabels,
} from '@somesay/shared';

import { Modal, PageHeader } from '@/shared/components';
import { ArrowBackIcon } from '@/shared/icons';
import {
  InfoSection,
  InfoRow,
  GENDER_LABELS,
  AccountProfileImage,
  ProductFitSection,
} from '@/features/myPage';
import { useAuth, useFetchUserProducts, useLogout } from '@/shared/hooks';

export const AccountPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  // 목록 조회가 실패해도 계정 화면은 쓸 수 있어야 해서 빈 목록으로 둡니다.
  const { data: matchedProducts = [] } = useFetchUserProducts('MATCHED');
  const { data: mismatchedProducts = [] } = useFetchUserProducts('MISMATCHED');
  const { logout, isPending: isLoggingOut } = useLogout();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // ProtectedRoute가 인증된 뒤에만 렌더하므로 실제로는 항상 값이 있습니다.
  if (!user) return null;

  const {
    profileImgUrl,
    nickname,
    gender,
    age,
    skinTypeIds,
    skinExpectationIds,
  } = user;

  const ACCOUNT_BASE = `${PATH.MY_PAGE.BASE}/${PATH.MY_PAGE.ACCOUNT.BASE}`;
  const BASIC_INFO_ROWS = [
    {
      label: '닉네임',
      value: nickname,
      to: `${ACCOUNT_BASE}/${PATH.MY_PAGE.ACCOUNT.NICKNAME}`,
    },
    {
      label: '성별',
      value: GENDER_LABELS[gender],
      to: `${ACCOUNT_BASE}/${PATH.MY_PAGE.ACCOUNT.GENDER}`,
    },
    {
      label: '연령',
      value: getAgeLabel(age),
      to: `${ACCOUNT_BASE}/${PATH.MY_PAGE.ACCOUNT.AGE}`,
    },
  ];
  const SKIN_INFO_ROWS = [
    {
      label: '피부 타입',
      value: getSkinTypeLabels(skinTypeIds).join(', '),
      to: `${ACCOUNT_BASE}/${PATH.MY_PAGE.ACCOUNT.SKIN_TYPE}`,
    },
    {
      label: '피부 고민',
      value: getConcernLabels(skinExpectationIds).join(', '),
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
        <AccountProfileImage profileImgUrl={profileImgUrl} />

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
          <ProductFitSection
            matches={matchedProducts}
            mismatches={mismatchedProducts}
          />
          {/* 계정 설정 */}
          <InfoSection title="계정 설정">
            <InfoRow
              label="로그아웃"
              onClick={() => setIsLogoutModalOpen(true)}
            />
            <InfoRow label="회원탈퇴" onClick={() => {}} />
          </InfoSection>
        </div>
      </div>

      {/* 로그아웃 확인 모달 */}
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="로그아웃 하시겠어요?"
        description={null}
        leftButton={{
          label: '취소',
          onClick: () => setIsLogoutModalOpen(false),
        }}
        rightButton={{
          label: '로그아웃',
          onClick: logout,
          disabled: isLoggingOut,
        }}
      />
    </div>
  );
};
