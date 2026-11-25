import { PATH } from '@/routes/path';
import {
  InfoRow,
  InfoSection,
  MyActivityStatistics,
  MyPageFeedback,
  MyPageSummarySkeleton,
  MyProfile,
  RecommendedCreators,
  RecommendedCreatorsTooltip,
} from '@/features/myPage';
import { PageHeader } from '@/shared/components';
import { useAuth, useFetchUserMyPage } from '@/shared/hooks';

export const MyPage = () => {
  // 마이페이지 응답에 연령이 없어 /users/info 캐시에서 채웁니다.
  const { user } = useAuth();
  const { data, isPending, isError, refetch } = useFetchUserMyPage();

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
          userProfileImgUrl={data.userProfileImgUrl}
          userNickname={data.userNickname}
          userSkinTypes={data.userSkinTypes}
          userAge={user?.userAge ?? null}
        />
        <MyActivityStatistics
          userReactedProductCount={data.userReactedProductCount}
          userReactedCreatorCount={data.userReactedCreatorCount}
          userAgreeCount={data.userAgreeCount}
          userDisagreeCount={data.userDisagreeCount}
          userCommentCount={data.userCommentCount}
        />
      </>
    );
  };

  return (
    <div className="mt-13.5 flex flex-col">
      <PageHeader title="마이페이지" />

      <div className="flex flex-col px-4">{renderSummary()}</div>

      <hr className="bg-grey01 my-7 h-1.75 border-0" />

      {/* 좌우 여백은 섹션이 직접 다룹니다 — 캐러셀이 화면 끝까지 흘러야 해서요. */}
      <div data-feature={['F-0057', 'F-0058']} className="relative">
        <RecommendedCreatorsTooltip />
        <RecommendedCreators />
      </div>

      <hr className="bg-grey01 h-1.75 border-0" />

      <div className="divide-grey03 flex flex-col divide-y px-4 pb-10">
        <InfoSection title="나의 활동">
          <InfoRow
            label="리뷰 관리"
            to={`${PATH.MY_PAGE.BASE}/${PATH.MY_PAGE.REVIEW_EVALUATION.BASE}`}
          />
          <InfoRow data-feature="F-0062" label="찜한 상품" />
          <InfoRow data-feature="F-0061" label="찜한 크리에이터" />
        </InfoSection>

        <InfoSection data-feature="F-0064" title="고객센터">
          <InfoRow data-feature="F-0065" label="1:1 문의" />
          <InfoRow data-feature="F-0066" label="제품 추가 요청" />
          <InfoRow data-feature="F-0067" label="공지사항" />
          <InfoRow data-feature="F-0068" label="자주 묻는 질문" />
        </InfoSection>
      </div>
    </div>
  );
};
