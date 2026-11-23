import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import {
  CreatorHomeProfile,
  SearchBar,
  SortBar,
  PageHeader,
} from '@/shared/components';
import {
  CreatorHomeTrustScore,
  MOCK_CREATOR,
  MOCK_CREATOR_LIKE_COUNT,
  MOCK_CREATOR_REVIEWS,
} from '@/features/creatorHome';
import { HorizontalCategoriesTab } from '@/shared/components';
import { CreatorHomeReviewCard } from '@/shared/components';
import { ArrowBackIcon, ShareIcon } from '@/shared/icons';
import { useFetchCategories } from '@/shared/hooks';

const SORT_OPTIONS = [
  { value: 'popular', label: '인기순' },
  { value: 'latest', label: '최신순' },
];
const ALL_CATEGORY = { id: 0, label: '전체' };

export const CreatorHomePage = () => {
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentSortValue, setCurrentSortValue] = useState('popular');
  const { data: categoryGroups = [] } = useFetchCategories();

  const categories = [
    ALL_CATEGORY,
    ...categoryGroups.map(({ mainCategoryId, mainCategoryName }) => ({
      id: mainCategoryId,
      label: mainCategoryName,
    })),
  ];

  const handleSelectCategory = (id: number) => {
    setSelectedCategoryId(id);
    setIsExpanded(false);
  };

  // 리뷰 응답에는 대분류 id 가 없고 이름(mainCategoryName)만 있어 이름으로 거릅니다.
  // TODO: 연동 시 확인 — 크리에이터 리뷰 검색 API 는 subCategoryId 로만 거른다(대분류 탭과 기준이 다름)
  const selectedCategoryName = categories.find(
    ({ id }) => id === selectedCategoryId
  )?.label;
  const filteredReviews =
    selectedCategoryId === ALL_CATEGORY.id
      ? MOCK_CREATOR_REVIEWS
      : MOCK_CREATOR_REVIEWS.filter(
          (review) => review.mainCategoryName === selectedCategoryName
        );

  const visibleReviews = isExpanded
    ? filteredReviews
    : filteredReviews.slice(0, 3);

  return (
    <div className="mt-13.5 flex flex-col bg-white">
      {/* @spec 7.6.1, 7.6.2 */}
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
        {/* @spec 7.1.1, 7.1.2, 7.1.3 */}
        <CreatorHomeProfile
          {...MOCK_CREATOR}
          likeCount={MOCK_CREATOR_LIKE_COUNT}
        />
        {/* @spec 7.2.1, 7.2.2, 7.3.1 */}
        <CreatorHomeTrustScore {...MOCK_CREATOR} isLoggedIn={true} />
      </div>
      {/* 검색 + 정렬 */}
      <div className="mb-6 flex flex-col gap-4 px-4">
        {/* @spec 7.4.1 */}
        <SearchBar
          placeholder="레오제이에서의 검색"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSubmit={() => {}}
          onClear={() => setSearchValue('')}
        />
        {/* @spec 7.5.1 */}
        <HorizontalCategoriesTab
          categories={categories}
          selectedId={selectedCategoryId}
          onSelect={handleSelectCategory}
          ariaLabel="상품 카테고리"
        />
        {/* @spec 7.5.3 */}
        <SortBar
          count={filteredReviews.length}
          sortOptions={SORT_OPTIONS}
          currentSortValue={currentSortValue}
          onSelectSort={setCurrentSortValue}
        />
      </div>
      {/* @spec 7.5.1, 7.5.2, 7.5.4 */}
      <div className="flex flex-col gap-6 px-4 pb-10">
        {/* 리뷰 목록 */}
        {visibleReviews.map((review) => (
          <li key={review.reviewId} className="list-none">
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
