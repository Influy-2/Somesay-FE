import { useState, useMemo, useCallback } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router';
import { PATH } from '@/routes/path';
import {
  PageHeader,
  RadioProductItem,
  SearchBar,
  HorizontalCategoriesTab,
  SortBar,
  SelectedItem,
} from '@/shared/components';
import { ArrowBackIcon } from '@/shared/icons';
import {
  useFetchCategories,
  useFetchUserProductSearch,
  usePostUserProduct,
} from '@/shared/hooks';
import { MAX_PRODUCT_SELECTION } from '@/features/productSelection';
import { useSnackbarStore } from '@/shared/stores';
import cn from '@/utils/cn';

import type {
  UserProductDetailType,
  UserProductSearchSortType,
  UserProductStatusType,
} from '@somesay/shared';

// 서버가 받는 정렬 기준만 노출합니다. 라벨은 디자인 확정 시 여기만 고치면 됩니다.
const SORT_OPTIONS: { value: UserProductSearchSortType; label: string }[] = [
  { value: 'RATING_DESC', label: '평점순' },
  { value: 'PRICE_ASC', label: '낮은 가격순' },
  { value: 'PRICE_DESC', label: '높은 가격순' },
];
const DEFAULT_SORT_TYPE: UserProductSearchSortType = 'RATING_DESC';

const ALL_CATEGORY = { id: 0, label: '전체' };

export const AddProductPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as {
    type: 'matches' | 'mismatches';
    currentProducts: UserProductDetailType[];
  } | null;

  const [selectedCategoryId, setSelectedCategoryId] = useState(ALL_CATEGORY.id);
  const [searchValue, setSearchValue] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<
    UserProductDetailType[]
  >([]);
  const [sortType, setSortType] =
    useState<UserProductSearchSortType>(DEFAULT_SORT_TYPE);
  const [submittedKeyword, setSubmittedKeyword] = useState('');
  const showSnackbar = useSnackbarStore((store) => store.showSnackbar);
  const { data: categoryGroups = [] } = useFetchCategories();

  const categories = [
    ALL_CATEGORY,
    ...categoryGroups.map((category) => ({
      id: category.mainCategoryId,
      label: category.mainCategoryName,
    })),
  ];

  const { type, currentProducts } = state ?? {
    type: null,
    currentProducts: [],
  };

  // 서버 검색이 keyword를 필수로 받아, 검색어를 제출하기 전에는 목록을 조회하지 않습니다.
  // TODO: 검색 전 기본 목록은 백엔드 지원이 정해질 때까지 보류 (.claude/docs/refactor-todo.md)
  const {
    data: searchResult,
    isPending: isSearchPending,
    isError: isSearchError,
  } = useFetchUserProductSearch({
    keyword: submittedKeyword,
    sortType,
    ...(selectedCategoryId === ALL_CATEGORY.id
      ? {}
      : { mainCategoryId: selectedCategoryId }),
  });
  const { mutate: addUserProducts, isPending: isAdding } = usePostUserProduct();

  const isSearchMode = submittedKeyword.length > 0;

  const products = useMemo(() => searchResult?.details ?? [], [searchResult]);

  const currentProductIds = useMemo(
    () => new Set(currentProducts.map((p) => p.productId)),
    [currentProducts]
  );

  const selectedProductIds = useMemo(
    () => new Set(selectedProducts.map((p) => p.productId)),
    [selectedProducts]
  );

  const handleSelect = useCallback(
    (productId: number) => {
      const product = products.find((p) => p.productId === productId);
      if (!product || currentProductIds.has(productId)) return;

      const isSelected = selectedProductIds.has(productId);
      if (
        !isSelected &&
        currentProducts.length + selectedProducts.length >=
          MAX_PRODUCT_SELECTION
      ) {
        showSnackbar('최대 15개까지 저장 가능해요.');
        return;
      }

      setSelectedProducts((prev) =>
        prev.some((p) => p.productId === product.productId)
          ? prev.filter((p) => p.productId !== product.productId)
          : [...prev, product]
      );
    },
    [
      products,
      currentProductIds,
      currentProducts.length,
      selectedProductIds,
      selectedProducts.length,
      showSnackbar,
    ]
  );

  const handleAlreadyAdded = useCallback(() => {
    showSnackbar('이미 저장된 상품입니다.');
  }, [showSnackbar]);

  const handleRemoveSelected = useCallback((productId: number) => {
    setSelectedProducts((prev) =>
      prev.filter((p) => p.productId !== productId)
    );
  }, []);

  if (!state) {
    return (
      <Navigate
        to={`${PATH.MY_PAGE.BASE}/${PATH.MY_PAGE.ACCOUNT.BASE}`}
        replace
      />
    );
  }

  const handleSubmitSearch = () => setSubmittedKeyword(searchValue.trim());

  const handleClearSearch = () => {
    setSearchValue('');
    setSubmittedKeyword('');
  };

  const handleSelectSort = (value: string) => {
    const option = SORT_OPTIONS.find(
      (sortOption) => sortOption.value === value
    );
    if (option) setSortType(option.value);
  };

  const title = type === 'matches' ? '잘 맞았던 제품' : '안 맞았던 제품';
  const status: UserProductStatusType =
    type === 'matches' ? 'MATCHED' : 'MISMATCHED';

  const isAddable = selectedProducts.length > 0 && !isAdding;

  const handleAdd = () => {
    if (!isAddable) return;

    addUserProducts(
      { status, productIds: selectedProducts.map((p) => p.productId) },
      {
        onSuccess: () => navigate(-1),
        onError: () =>
          showSnackbar(
            '상품을 추가하지 못했어요. 잠시 후 다시 시도해 주세요.',
            {
              variant: 'error',
            }
          ),
      }
    );
  };

  const renderProducts = () => {
    if (!isSearchMode) {
      return (
        <p className="body2-m text-grey05 px-4 py-20 text-center">
          제품명 또는 브랜드를 검색해 주세요.
        </p>
      );
    }
    if (isSearchPending) {
      return (
        <div
          role="status"
          aria-busy="true"
          aria-label="검색 결과를 불러오는 중"
          className="py-20"
        />
      );
    }
    if (isSearchError) {
      return (
        <p className="body2-m text-grey05 px-4 py-20 text-center">
          검색 결과를 불러오지 못했어요.
        </p>
      );
    }
    if (products.length === 0) {
      return (
        <p className="body2-m text-grey05 px-4 py-20 text-center">
          검색 결과가 없어요.
        </p>
      );
    }
    return (
      <ul className="divide-grey02 divide-y">
        {products.map((product) => (
          <RadioProductItem
            key={product.productId}
            {...product}
            isSelected={selectedProductIds.has(product.productId)}
            isAlreadyAdded={currentProductIds.has(product.productId)}
            onClick={handleSelect}
            onAlreadyAdded={handleAlreadyAdded}
          />
        ))}
      </ul>
    );
  };

  return (
    <div
      className={cn(
        'mt-13.5 flex flex-col',
        selectedProducts.length > 0 ? 'pb-60' : 'pb-25'
      )}
    >
      <PageHeader
        left={
          <button type="button" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </button>
        }
        title={title}
        right={[
          <button
            key="add"
            type="button"
            onClick={handleAdd}
            disabled={!isAddable}
            className={cn('body1-sb', isAddable ? 'text-black' : 'text-grey04')}
          >
            추가
          </button>,
        ]}
      />
      <div>
        <div className="px-4">
          <SearchBar
            placeholder="제품명 또는 브랜드 검색"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSubmit={handleSubmitSearch}
            onClear={handleClearSearch}
          />
        </div>

        {/* 카테고리 필터 */}
        <div className="px-4 pt-4">
          <HorizontalCategoriesTab
            categories={categories}
            selectedId={selectedCategoryId}
            onSelect={setSelectedCategoryId}
            ariaLabel="상품 카테고리"
          />
        </div>

        {/* 정렬바 */}
        {isSearchMode && (
          <SortBar
            count={searchResult?.totalCount ?? 0}
            sortOptions={SORT_OPTIONS}
            currentSortValue={sortType}
            onSelectSort={handleSelectSort}
          />
        )}
      </div>
      {/* 제품 리스트 */}
      {renderProducts()}

      {/* 하단 바텀시트 */}
      <div className="fixed bottom-0 left-1/2 w-full max-w-110 -translate-x-1/2 rounded-t-[1.25rem] bg-white px-4 pt-10 pb-10 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
        {/* 드래그 핸들 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pt-2.5">
          <div className="bg-grey03 h-1 w-12 rounded-full" />
        </div>

        {/* 선택된 제품 수 */}
        <p className="body2-m text-grey06 mb-2">
          선택된 제품 {selectedProducts.length}
        </p>

        {/* 선택된 제품 목록 */}
        {selectedProducts.length > 0 && (
          <div className="scrollbar-hide mt-2 flex gap-2 overflow-x-auto">
            {selectedProducts.map((product) => (
              <SelectedItem
                key={product.productId}
                {...product}
                onRemove={handleRemoveSelected}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
