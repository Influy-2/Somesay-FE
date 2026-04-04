import { useState } from 'react';
import { MOCK_REVIEWS } from '@/features/productDetail';
import { ReviewRankingItem } from './ReviewRankingItem';
import { OnOffButton } from '@/shared/components';

const INITIAL_DISPLAY_COUNT = 3;
const LOAD_MORE_COUNT = 10;

export const ReviewRankingList = () => {
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);
  const [isMySkinTypeOnly, setIsMySkinTypeOnly] = useState(false);

  const remainingCount = MOCK_REVIEWS.length - displayCount;

  return (
    <div className="flex flex-col bg-white pb-5">
      <div className="px-4 py-5">
        <h2 className="headline4 text-black">
          공감을 많이 받은 크리에이터 리뷰
        </h2>
      </div>

      <div className="bg-grey01 flex items-center justify-between px-4 py-3">
        <label htmlFor="skin-type-filter" className="body2-m text-black">
          내 피부 타입의 리뷰만 보기
        </label>
        <OnOffButton
          isOn={isMySkinTypeOnly}
          onToggle={() => setIsMySkinTypeOnly((prev) => !prev)}
          aria-label="내 피부 타입의 리뷰만 보기"
        />
      </div>

      <div className="flex flex-col gap-5">
        {MOCK_REVIEWS.slice(0, displayCount).map((review) => (
          <ReviewRankingItem key={review.id} review={review} />
        ))}

        {remainingCount > 0 && (
          <div className="px-4 pt-1">
            <button
              onClick={() => setDisplayCount((prev) => prev + LOAD_MORE_COUNT)}
              aria-label={`크리에이터 리뷰 ${remainingCount}개 더 불러오기`}
              className="border-grey03 body2-m flex h-10 w-full items-center justify-center border"
            >
              크리에이터 리뷰 {remainingCount}개 더보기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
