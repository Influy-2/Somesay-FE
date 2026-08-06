import { useAuthGuard } from '@/features/auth';
import { flattenRankingPages } from '@/features/ranking/ranking.utils';
import { CreatorRankingCard, MoreButton } from '@/shared/components';
import { useFetchCreatorRanking } from '@/shared/hooks';
import { CreatorRankingSkeleton } from './CreatorRankingSkeleton';
import { RankingFeedback } from './RankingFeedback';

// 크리에이터 랭킹의 페이지 크기와 최대 노출 개수를 정의합니다.
const PAGE_SIZE = 10;
const CREATOR_RANKING_LIMIT = 30;

/** 크리에이터 신뢰도 랭킹 목록과 추가 조회 상태를 관리합니다. */
export const CreatorRankingsSection = () => {
  // 크리에이터 랭킹을 10개 단위로 조회하고 최대 30개로 제한합니다.
  const query = useFetchCreatorRanking({ size: PAGE_SIZE });
  const creators = flattenRankingPages(
    query.data?.pages,
    CREATOR_RANKING_LIMIT
  );
  const canLoadMore =
    creators.length < CREATOR_RANKING_LIMIT && query.hasNextPage;

  // 추가 조회는 로그인 사용자에게만 허용하고 중복 요청을 차단합니다.
  const guardAction = useAuthGuard();
  const loadMore = guardAction(() => {
    if (!canLoadMore || query.isFetchingNextPage) return;
    void query.fetchNextPage();
  });

  const renderCreators = () => {
    // 최초 조회 중에는 첫 페이지와 같은 개수의 골격을 보여줍니다.
    if (query.isPending) return <CreatorRankingSkeleton />;

    // 최초 페이지 조회 실패 시 같은 쿼리를 다시 실행할 수 있게 합니다.
    if (query.isError && creators.length === 0) {
      return (
        <RankingFeedback
          message="크리에이터 랭킹을 불러오지 못했어요."
          onRetry={() => void query.refetch()}
        />
      );
    }

    if (creators.length === 0) {
      return <RankingFeedback message="크리에이터 랭킹이 없어요." />;
    }

    return (
      <div className="flex flex-col gap-6 pt-6">
        {/* 서버가 전달한 순위와 변동 정보를 카드에 그대로 전달합니다. */}
        <ol className="flex flex-col gap-8 px-4">
          {creators.map((creator) => (
            <CreatorRankingCard {...creator} key={creator.creatorId} />
          ))}
        </ol>

        {/* 다음 페이지 오류에는 재시도, 정상 상태에는 더보기를 표시합니다. */}
        {query.isFetchNextPageError ? (
          <div className="px-4">
            <RankingFeedback
              message="크리에이터 랭킹을 더 불러오지 못했어요."
              onRetry={loadMore}
            />
          </div>
        ) : (
          canLoadMore && (
            <div className="px-4">
              <MoreButton
                text={
                  query.isFetchingNextPage
                    ? '크리에이터 랭킹을 불러오는 중'
                    : '크리에이터 신뢰도 랭킹 더보기'
                }
                onClick={loadMore}
                disabled={query.isFetchingNextPage}
              />
            </div>
          )
        )}
      </div>
    );
  };

  return (
    <section aria-label="크리에이터 신뢰도 랭킹">{renderCreators()}</section>
  );
};
