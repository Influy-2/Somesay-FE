import { useAuthGuard } from '@/shared/hooks';
import { flattenRankingPages } from '../ranking.utils';
import { CreatorRankingCard, MoreButton } from '@/shared/components';
import { useFetchCreatorRanking } from '@/shared/hooks';
import { CreatorRankingSkeleton } from './CreatorRankingSkeleton';
import { RankingFeedback } from './RankingFeedback';

// 30위까지만 노출합니다(기획 2.2.1).
const PAGE_SIZE = 10;
const CREATOR_RANKING_LIMIT = 30;

export const CreatorRankingsSection = () => {
  const query = useFetchCreatorRanking({ size: PAGE_SIZE });
  const creators = flattenRankingPages(
    query.data?.pages,
    CREATOR_RANKING_LIMIT
  );
  const canLoadMore =
    creators.length < CREATOR_RANKING_LIMIT && query.hasNextPage;

  // 더보기는 로그인 사용자에게만 허용합니다(기획).
  const guardAction = useAuthGuard();
  const loadMore = guardAction(() => {
    if (!canLoadMore || query.isFetchingNextPage) return;
    void query.fetchNextPage();
  });

  const renderCreators = () => {
    if (query.isPending) return <CreatorRankingSkeleton />;

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
        <ol className="flex flex-col gap-8 px-4">
          {creators.map((creator) => (
            <li key={creator.creatorId} className="w-full list-none">
              <CreatorRankingCard {...creator} />
            </li>
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
