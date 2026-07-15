import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  HorizontalCategoriesTab,
  PageHeader,
  SortBar,
} from '@/shared/components';
import { ArrowBackIcon, SearchIcon } from '@/shared/icons';
import { useFetchCategories } from '@/shared/hooks';

const SORT_OPTIONS = [
  { value: 'rating', label: '평점순' },
  { value: 'review', label: '리뷰 많은 순' },
  { value: 'price_low', label: '가격 낮은 순' },
];

export const DaisoProductsPage = () => {
  const navigate = useNavigate();
  const { data: categoryGroups = [] } = useFetchCategories();

  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [currentSortValue, setCurrentSortValue] = useState('rating');

  const tabCategories = [
    { id: 0, label: '전체' },
    ...categoryGroups.map((c) => ({
      id: c.mainCategoryId,
      label: c.mainCategoryName,
    })),
  ];

  return (
    <div className="mt-18.5 flex min-h-dvh flex-col bg-white">
      {' '}
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
        title="다이소 제품"
        right={[
          <button key="search" type="button" aria-label="검색">
            <SearchIcon aria-hidden="true" />
          </button>,
        ]}
      />
      <div className="px-4 pb-0.5">
        <HorizontalCategoriesTab
          categories={tabCategories}
          selectedId={selectedCategoryId}
          onSelect={setSelectedCategoryId}
          ariaLabel="다이소 제품 카테고리"
        />
      </div>
      <div className="pb-2.5">
        <SortBar
          count={0}
          sortOptions={SORT_OPTIONS}
          currentSortValue={currentSortValue}
          onSelectSort={setCurrentSortValue}
        />
      </div>
    </div>
  );
};
