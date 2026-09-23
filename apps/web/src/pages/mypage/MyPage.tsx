import { useState } from 'react';

import { PATH } from '@/routes/path';
import {
  InfoRow,
  InfoSection,
  MyActivityStatistics,
  MyPageFeedback,
  MyPageSummarySkeleton,
  MyProfile,
  RecommendedCreators,
} from '@/features/myPage';
import { PageHeader, Tooltip } from '@/shared/components';
import { useAuth, useFetchUserMyPage } from '@/shared/hooks';

export const MyPage = () => {
  // 마이페이지 응답에 연령이 없어 /users/info 캐시에서 채웁니다.
  const { user } = useAuth();
  const { data, isPending, isError, refetch } = useFetchUserMyPage();
  const [isTooltipVisible, setIsTooltipVisible] = useState(true);

  // 프로필과 활동 통계는 같은 쿼리에서 오므로 로딩·에러를 한 덩어리로 다룹니다.
  const renderSummary = () => {
    if (isPending) return <MyPageSummarySkeleton />;

    if (isError || !data) {
      return (
        <MyPageFeedback
          message="내 정보를 불러오지 못했어요."
          onRetry={() => void refetch()}
        />
      );
    }

    return (
      <>
        <MyProfile
          profileImgUrl={data.profileImgUrl}
          nickname={data.nickname}
          skinTypeIds={data.skinTypeIds}
          age={user?.age ?? null}
        />
        <MyActivityStatistics {...data.statistics} />
      </>
    );
  };

  return (
    <div className="mt-13.5 flex flex-col">
      <PageHeader title="마이페이지" />

      <div className="flex flex-col px-4">{renderSummary()}</div>

      <hr className="bg-grey01 my-7 h-1.75 border-0" />

      <div className="relative px-4">
        {isTooltipVisible && (
          <Tooltip
            label="리뷰를 많이 평가할 수록 추천이 정확해져요!"
            isVisible={isTooltipVisible}
            variant="withClose"
            onClose={() => setIsTooltipVisible(false)}
            className="-top-12 left-4"
            arrowPosition="top"
            arrowClassName="left-6"
          />
        )}
        <RecommendedCreators />
      </div>

      <hr className="bg-grey01 h-1.75 border-0" />

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
