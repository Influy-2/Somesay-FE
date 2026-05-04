import type { ReviewSearchResultType } from '@somesay/shared';

import { SortBar, SearchResultReviewCard } from '@/shared/components';

import type { ReviewSearchSortOptionType } from '../types/search.types';
import { NoResultMessage } from './NoResultMessage';

const REVIEW_SORT_OPTIONS: {
  value: ReviewSearchSortOptionType;
  label: string;
}[] = [
  { value: 'latest', label: '최신순' },
  { value: 'rating_desc', label: '리뷰 평점 높은 순' },
  { value: 'rating_asc', label: '리뷰 평점 낮은 순' },
];

interface SearchReviewSectionProps {
  reviews: ReviewSearchResultType[];
  sortBy: ReviewSearchSortOptionType;
  onSortChange: (value: ReviewSearchSortOptionType) => void;
}

export const SearchReviewSection = ({
  reviews,
  sortBy,
  onSortChange,
}: SearchReviewSectionProps) => {
  if (reviews.length === 0) {
    return <NoResultMessage />;
  }

  return (
    <>
      <SortBar
        count={reviews.length}
        sortOptions={REVIEW_SORT_OPTIONS}
        currentSortValue={sortBy}
        onSelectSort={(value) =>
          onSortChange(value as ReviewSearchSortOptionType)
        }
      />
      <ul
        className="mt-6 flex flex-col gap-6"
        aria-label="일치하는 리뷰 검색 결과"
      >
        {reviews.map((review) => (
          <li key={review.reviewId}>
            <SearchResultReviewCard review={review} />
          </li>
        ))}
      </ul>
    </>
  );
};
