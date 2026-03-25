import { useState } from 'react';
import { CreatorHomeHeader } from '@/features/creatorHome';
import { CreatorHomeProfile, SearchBar, SortBar } from '@/shared/components';
import { CreatorHomeTrustScore } from '@/features/creatorHome';
import { HorizontalCategoriesTab } from '@/shared/components';
import { CreatorHomeReviewCard } from '@/shared/components/review/CreatorHomeReviewCard';

import { CategoryType } from '@somesay/shared';
import {
  MOCK_CREATOR,
  MOCK_TRUST_SCORE,
  MOCK_CREATOR_REVIEWS,
} from '../../features/creatorHome/components/mockData';

const CATEGORIES: CategoryType[] = [
  { id: 1, title: '전체' },
  { id: 2, title: '클렌징/필링' },
  { id: 3, title: '마스크/팩' },
  { id: 4, title: '선케어' },
  { id: 5, title: '베이스' },
];

export const CreatorHomePage = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSelectCategory = (id: number) => {
    setSelectedCategoryId(id);
    setIsExpanded(false);
  };

  const filteredReviews =
    selectedCategoryId === 1
      ? MOCK_CREATOR_REVIEWS
      : MOCK_CREATOR_REVIEWS.filter(
          (review) => review.product.categoryId === selectedCategoryId
        );

  const visibleReviews = isExpanded
    ? filteredReviews
    : filteredReviews.slice(0, 3);

  return (
    <div className="flex w-full flex-col">
      <CreatorHomeHeader />
      <div className="mb-7.5 flex flex-col gap-5 px-4 pt-2">
        <CreatorHomeProfile {...MOCK_CREATOR} />
        <CreatorHomeTrustScore {...MOCK_TRUST_SCORE} isLoggedIn={true} />
      </div>

      {/* 검색 + 정렬 */}
      <div className="mb-6 flex flex-col gap-4 px-4">
        <SearchBar
          placeholder="레오제이에서의 검색"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSubmit={() => {}}
          onClear={() => setSearchValue('')}
        />
        <HorizontalCategoriesTab
          categories={CATEGORIES}
          selectedId={selectedCategoryId}
          onSelect={handleSelectCategory}
          ariaLabel="상품 카테고리"
        />
        <SortBar productCount={filteredReviews.length} />
      </div>
      <div className="flex flex-col gap-6 px-4 pb-10">
        {/* 리뷰 목록 */}
        {visibleReviews.map((review) => (
          <li key={review.product.productId}>
            <CreatorHomeReviewCard {...review} />
          </li>
        ))}
        {filteredReviews.length > 3 && !isExpanded && (
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="border-grey03 body2-m flex h-10 w-full items-center justify-center border py-2"
          >
            리뷰 더보기
          </button>
        )}
      </div>
    </div>
  );
};

export default CreatorHomePage;
