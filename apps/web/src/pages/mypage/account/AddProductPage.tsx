import { useState, useMemo, useCallback } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router';
import { PATH } from '@/routes/path';
import {
  PageHeader,
  RadioProductItem,
  SearchBar,
  HorizontalCategoriesTab,
  SortBar,
  Snackbar,
  SelectedItem,
} from '@/shared/components';
import { ArrowBackIcon } from '@/shared/icons';
import { MOCK_PRODUCTS } from '@/features/myPage/components/mockData';
import { useFetchCategories } from '@/shared/hooks';
import cn from '@/utils/cn';

type FitProduct = {
  productId: number;
  imageUrl: string;
  productName: string;
  brand: string;
};

const SORT_OPTIONS = [
  { value: 'popular', label: '인기순' },
  { value: 'latest', label: '최신순' },
];

const ALL_CATEGORY = { id: 0, label: '전체' };

export const AddProductPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as {
    type: 'matches' | 'mismatches';
    currentProducts: FitProduct[];
  } | null;

  const [selectedCategoryId, setSelectedCategoryId] = useState(ALL_CATEGORY.id);
  const [searchValue, setSearchValue] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<FitProduct[]>([]);
  const [currentSortValue, setCurrentSortValue] = useState('popular');
  const [showAlreadyAddedSnackbar, setShowAlreadyAddedSnackbar] =
    useState(false);
  const { data: categoryGroups = [] } = useFetchCategories();

  const categories = [
    ALL_CATEGORY,
    ...categoryGroups.map((category) => ({
      id: category.mainCategoryId,
      label: category.mainName,
    })),
  ];

  const { type, currentProducts } = state ?? {
    type: null,
    currentProducts: [],
  };

  const filteredProducts = useMemo(
    () =>
      selectedCategoryId === ALL_CATEGORY.id
        ? MOCK_PRODUCTS
        : MOCK_PRODUCTS.filter((p) => p.categoryId === selectedCategoryId),
    [selectedCategoryId]
  );

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
      const product = MOCK_PRODUCTS.find((p) => p.productId === productId);
      if (!product || currentProductIds.has(productId)) return;
      setSelectedProducts((prev) =>
        prev.some((p) => p.productId === product.productId)
          ? prev.filter((p) => p.productId !== product.productId)
          : [...prev, product]
      );
    },
    [currentProductIds]
  );

  const handleAlreadyAdded = useCallback(() => {
    setShowAlreadyAddedSnackbar(true);
  }, []);

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

  const title = type === 'matches' ? '잘 맞았던 제품' : '안 맞았던 제품';

  const handleAdd = () => {
    // TODO: API 연결 후 추가 로직 교체
    navigate(-1);
  };

  const isAddable = selectedProducts.length > 0;

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
            onSubmit={() => {}}
            onClear={() => setSearchValue('')}
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
        <SortBar
          count={filteredProducts.length}
          sortOptions={SORT_OPTIONS}
          currentSortValue={currentSortValue}
          onSelectSort={setCurrentSortValue}
        />
      </div>
      {/* 제품 리스트 */}
      <ul className="divide-grey02 divide-y">
        {filteredProducts.map((product) => (
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
      {showAlreadyAddedSnackbar && (
        <Snackbar
          message="이미 저장된 상품입니다."
          onClose={() => setShowAlreadyAddedSnackbar(false)}
          className="bottom-10 w-fit"
        />
      )}
    </div>
  );
};
