import { Link } from 'react-router';
import { useState } from 'react';
import { PATH } from '@/routes/path';
import { MainArrow20Icon } from '@/shared/icons';
import { InfoRow } from '@/features/myPage/components/InfoRow';
import { InfoSection } from '@/features/myPage/components/InfoSection';
import { MyPageDashboard } from '@/features/myPage/components/MyPageDashboard';
import { RecommendedCreators } from '@/features/myPage/components/RecommendedCreators';
import { PageHeader, ChipBasic, Tooltip } from '@/shared/components';

const MOCK_USER = {
  nickname: '닉네임',
  ageGroup: '20대',
  skinType: '건성',
  stats: {
    agreedReviews: 9,
    disagreedReviews: 12,
    comments: 9,
    evaluatedProducts: 23,
    evaluatedCreators: 15,
  },
};

export const MyPage = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="mt-13.5 flex flex-col">
      <PageHeader title="마이페이지" />

      <div className="flex flex-col px-4">
        {/* 프로필 */}
        <div className="mb-1 flex items-start py-5">
          <div className="bg-grey02 size-15 shrink-0 overflow-hidden rounded-full" />
          <div className="ml-3 flex flex-1 flex-col gap-2">
            <span className="text-[1.25rem] leading-[150%] font-semibold">
              {MOCK_USER.nickname}
            </span>
            <div className="flex gap-1">
              <ChipBasic label={MOCK_USER.ageGroup} />
              <ChipBasic label={MOCK_USER.skinType} />
            </div>
          </div>
          <Link
            to={`${PATH.MY_PAGE.BASE}/${PATH.MY_PAGE.ACCOUNT.BASE}`}
            aria-label="계정 설정으로 이동"
          >
            <MainArrow20Icon />
          </Link>
        </div>

        <MyPageDashboard {...MOCK_USER.stats} />
      </div>
      <div className="mt-7" />

      <div className="bg-grey01 h-1.75" />
      <div className="mt-7" />

      <div className="relative px-4">
        {showTooltip && (
          <Tooltip
            label="리뷰를 많이 평가할 수록 추천이 정확해져요!"
            isVisible={showTooltip}
            variant="withClose"
            onClose={() => setShowTooltip(false)}
            className="-top-12 left-4"
            arrowPosition="top"
            arrowClassName="left-6"
          />
        )}
        <RecommendedCreators />
      </div>
      <div className="bg-grey01 h-1.75" />

      <div className="divide-grey03 flex flex-col divide-y px-4 pb-10">
        <InfoSection title="나의 활동">
          <InfoRow
            label="리뷰 관리"
            to={`${PATH.MY_PAGE.BASE}/${PATH.MY_PAGE.REVIEW_EVALUATION.BASE}`}
          />
          <InfoRow label="찜한 상품" />
          <InfoRow label="찜한 크리에이터" />
        </InfoSection>

        <InfoSection title="고객센터">
          <InfoRow label="1:1 문의" />
          <InfoRow label="제품 추가 요청" />
          <InfoRow label="공지사항" />
          <InfoRow label="자주 묻는 질문" />
        </InfoSection>
      </div>
    </div>
  );
};
