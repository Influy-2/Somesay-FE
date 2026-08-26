// 6.3 공감을 많이 받은 크리에이터 리뷰
import { useState } from 'react';
import { useFetchProductReviews } from '@/shared/hooks';
import { OnOffButton } from '@/shared/components';
import { ReviewRankingItem } from './ReviewRankingItem';
import { ReviewCommentSheet } from './ReviewCommentSheet';
import { ReviewTimeLinkSheet } from './ReviewTimeLinkSheet';
import type { ProductReviewType } from '@somesay/shared';

const INITIAL_DISPLAY_COUNT = 3;
const LOAD_MORE_COUNT = 10;
const HEADING_ID = 'empathized-review-heading';

interface ReviewRankingListProps {
  productId?: number;
}

export const ReviewRankingList = ({ productId }: ReviewRankingListProps) => {
  const [isMySkinTypeOnly, setIsMySkinTypeOnly] = useState(false);
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);
  const [timeLinkReview, setTimeLinkReview] =
    useState<ProductReviewType | null>(null);
  const [commentReview, setCommentReview] = useState<ProductReviewType | null>(
    null
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchProductReviews(productId, { filterByMySkin: isMySkinTypeOnly });

  const reviews = data?.pages.flatMap((page) => page.content) ?? [];
  const totalCount = data?.pages[0]?.totalElements ?? 0;
  const displayedReviews = reviews.slice(0, displayCount);
  const remainingCount = Math.max(totalCount - displayedReviews.length, 0);

  // 필터를 바꾸면 쿼리 키가 달라져 목록이 1페이지로 돌아가므로 표시 개수도 되돌립니다.
  // 되돌리지 않으면 이전에 펼쳐 둔 개수만큼 보여주려다 데이터가 모자라 어긋납니다.
  const handleToggleMySkinTypeOnly = () => {
    setIsMySkinTypeOnly((prev) => !prev);
    setDisplayCount(INITIAL_DISPLAY_COUNT);
  };

  // '표시 개수'와 '서버 페이지'는 별개 축이다. 보여줄 몫이 모자랄 때만 다음 페이지를 당겨온다.
  const handleShowMore = () => {
    const nextDisplayCount = displayCount + LOAD_MORE_COUNT;
    setDisplayCount(nextDisplayCount);

    if (nextDisplayCount > reviews.length && hasNextPage) {
      void fetchNextPage();
    }
  };

  return (
    <section
      className="flex flex-col bg-white pb-5"
      aria-labelledby={HEADING_ID}
    >
      <div className="px-4 py-5">
        <h2 id={HEADING_ID} className="headline4 text-black">
          공감을 많이 받은 크리에이터 리뷰
        </h2>
      </div>

      <div className="bg-grey01 flex items-center justify-between px-4 py-3">
        <span className="body2-m text-black">내 피부 타입의 리뷰만 보기</span>
        <OnOffButton
          isOn={isMySkinTypeOnly}
          onToggle={handleToggleMySkinTypeOnly}
          ariaLabel="내 피부 타입의 리뷰만 보기"
        />
      </div>

      <div className="flex flex-col gap-5">
        <ol className="flex flex-col gap-5">
          {displayedReviews.map((review) => (
            <li key={review.reviewId}>
              <ReviewRankingItem
                review={review}
                onOpenTimeLinkSheet={setTimeLinkReview}
                onOpenCommentSheet={setCommentReview}
              />
            </li>
          ))}
        </ol>

        {remainingCount > 0 && (
          <div className="px-4 pt-1">
            <button
              type="button"
              onClick={handleShowMore}
              disabled={isFetchingNextPage}
              aria-label={`크리에이터 리뷰 ${remainingCount}개 더보기`}
              className="border-grey03 body2-m flex h-10 w-full items-center justify-center border"
            >
              크리에이터 리뷰 {remainingCount}개 더보기
            </button>
          </div>
        )}
      </div>

      <ReviewTimeLinkSheet
        review={timeLinkReview}
        onClose={() => setTimeLinkReview(null)}
      />
      <ReviewCommentSheet
        review={commentReview}
        onClose={() => setCommentReview(null)}
      />
    </section>
  );
};
