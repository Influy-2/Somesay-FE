import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import {
  CreatorHomeProfile,
  SearchBar,
  SortBar,
  PageHeader,
} from '@/shared/components';
import { CreatorHomeTrustScore } from '@/features/creatorHome';
import { HorizontalCategoriesTab } from '@/shared/components';
import { CreatorHomeReviewCard } from '@/shared/components';
import { ArrowBackIcon, ShareIcon } from '@/shared/icons';
import { CATEGORIES } from '@somesay/shared';
import {
  MOCK_CREATOR,
  MOCK_TRUST_SCORE,
  MOCK_CREATOR_REVIEWS,
} from '../../features/creatorHome/components/mockData';

const SORT_OPTIONS = [
  { value: 'popular', label: '인기순' },
  { value: 'latest', label: '최신순' },
];

export const CreatorHomePage = () => {
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentSortValue, setCurrentSortValue] = useState('popular');

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
    <div className="mt-13.5 flex flex-col bg-white">
      <PageHeader
        left={
          <button
            type="button"
            aria-label="뒤로 가기"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon aria-hidden="true" />
          </button>
        }
        right={[
          <Link key="share" to="/" aria-label="공유">
            <ShareIcon aria-hidden="true" />
          </Link>,
        ]}
      />
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
          categories={CATEGORIES.map(({ categoryId, categoryLabel }) => ({
            id: categoryId,
            label: categoryLabel,
          }))}
          selectedId={selectedCategoryId}
          onSelect={handleSelectCategory}
          ariaLabel="상품 카테고리"
        />
        <SortBar
          productCount={filteredReviews.length}
          sortOptions={SORT_OPTIONS}
          currentSortValue={currentSortValue}
          onSelectSort={setCurrentSortValue}
        />
      </div>
      <div className="flex flex-col gap-6 px-4 pb-10">
        {/* 리뷰 목록 */}
        {visibleReviews.map((review) => (
          <li key={review.product.productId} className="list-none">
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
