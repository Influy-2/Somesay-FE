import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
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
import { CATEGORIES } from '@somesay/shared';

type FitProduct = {
  productId: number;
  imageUrl: string;
  productName: string;
  brand: string;
};

export const AddProductPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type, currentProducts } = location.state as {
    type: 'good' | 'bad';
    currentProducts: FitProduct[];
  };

  const title = type === 'good' ? '잘 맞았던 제품' : '안 맞았던 제품';

  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<FitProduct[]>([]);
  const [currentSortValue, setCurrentSortValue] = useState('popular');

  const filteredProducts =
    selectedCategoryId === 1
      ? MOCK_PRODUCTS
      : MOCK_PRODUCTS.filter((p) => p.categoryId === selectedCategoryId);
  const [showAlreadyAddedSnackbar, setShowAlreadyAddedSnackbar] =
    useState(false);
  const alreadyAdded = (productId: number) =>
    currentProducts.some((p) => p.productId === productId);

  const SORT_OPTIONS = [
    { value: 'popular', label: '인기순' },
    { value: 'latest', label: '최신순' },
  ];
  const isSelected = (productId: number) =>
    selectedProducts.some((p) => p.productId === productId);

  const handleSelect = (product: FitProduct) => {
    if (alreadyAdded(product.productId)) return;
    setSelectedProducts((prev) =>
      isSelected(product.productId)
        ? prev.filter((p) => p.productId !== product.productId)
        : [...prev, product]
    );
  };

  const handleRemoveSelected = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.filter((p) => p.productId !== productId)
    );
  };

  const handleAdd = () => {
    // TODO: API 연결 후 추가 로직 교체
    navigate(-1);
  };

  const isAddable = selectedProducts.length > 0;

  return (
    <div className="mt-13.5 flex flex-col pb-40">
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
            className={`body1-sb ${isAddable ? 'text-black' : 'text-grey04'}`}
          >
            추가
          </button>,
        ]}
      />

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
          categories={CATEGORIES.map(({ categoryId, categoryLabel }) => ({
            id: categoryId,
            label: categoryLabel,
          }))}
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
      {/* 제품 리스트 */}
      <ul className="divide-grey02 divide-y">
        {filteredProducts.map((product) => (
          <RadioProductItem
            key={product.productId}
            {...product}
            isSelected={isSelected(product.productId)}
            isAlreadyAdded={alreadyAdded(product.productId)}
            onClick={() => handleSelect(product)}
            onAlreadyAdded={() => setShowAlreadyAddedSnackbar(true)}
          />
        ))}
      </ul>
      {showAlreadyAddedSnackbar && (
        <Snackbar
          message="이미 저장된 상품입니다."
          onClose={() => setShowAlreadyAddedSnackbar(false)}
          className="bottom-10 w-fit"
        />
      )}

      {/* 하단 바텀시트 */}
      <div
        className={`fixed bottom-0 left-1/2 w-full max-w-110 -translate-x-1/2 rounded-t-[1.25rem] bg-white px-4 pt-10 pb-10 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]`}
      >
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
