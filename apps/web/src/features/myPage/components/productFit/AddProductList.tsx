import { useNavigate } from 'react-router';

import {
  ProductSearchTrigger,
  SelectableProductList,
  SelectedProductDock,
} from '@/features/productSelection';
import { HorizontalCategoriesTab, PageHeader } from '@/shared/components';
import { ArrowBackIcon } from '@/shared/icons';
import cn from '@/utils/cn';
import type { UserProductStatusType } from '@somesay/shared';

import { useAddProductList } from '../../hooks/useAddProductList';
import { useProductFitDraft } from '../../hooks/useProductFitDraft';

// 이 수 넘기면 9999+로 표현합니다. SortBar와 같은 표기를 쓰려고 값을 맞췄습니다.
const COUNT_OVERFLOW_THRESHOLD = 9999;

// 어느 쪽에 추가하는지와 검색 화면 경로를 받는 props입니다.
interface AddProductListProps {
  status: UserProductStatusType;
  searchPath: string;
}

export const AddProductList = ({ status, searchPath }: AddProductListProps) => {
  // 화면 이동, 선택·저장 로직, 카테고리·상품 목록 훅을 묶어 호출합니다.
  const navigate = useNavigate();
  const {
    title,
    selectedProducts,
    selectedProductIds,
    alreadyAddedProductIds,
    handleToggle,
    handleRemove,
    handleAlreadyAdded,
    canSubmit,
    submit,
  } = useProductFitDraft(status);
  const {
    categories,
    selectedCategoryId,
    selectCategory,
    products,
    productCount,
    isEmptyCategory,
    isLoading,
    isError,
    loadMoreRef,
  } = useAddProductList();

  // 목록 컴포넌트가 id만 넘겨주므로, 상품 객체를 찾아 선택 로직에 넘깁니다.
  const handleToggleById = (productId: number) => {
    const product = products.find((item) => item.productId === productId);
    if (product) handleToggle(product);
  };

  // 저장에 성공하면 목록 화면에서 한 단계 뒤로(저장된 상품 목록) 돌아갑니다.
  const handleSubmit = () => submit({ onSuccess: () => navigate(-1) });

  // SortBar와 같은 표기로 상품 개수를 만듭니다.
  const countLabel =
    productCount >= COUNT_OVERFLOW_THRESHOLD
      ? `${COUNT_OVERFLOW_THRESHOLD.toLocaleString()}+개`
      : `${productCount.toLocaleString()}개`;

  // 상태별로 본문을 고릅니다. 카테고리 실패 시 상품 쿼리가 계속 pending이라 에러를 로딩보다 먼저 봅니다.
  const renderProducts = () => {
    // 조회 실패 안내
    if (isError) {
      return (
        <p className="body2-m text-grey05 py-24 text-center">
          상품 목록을 불러오지 못했어요.
        </p>
      );
    }

    // 카테고리가 비어 있으면 상품 쿼리가 돌지 않으므로 로딩보다 먼저 빈 상태를 보여줍니다.
    if (isEmptyCategory) {
      return (
        <p className="body2-m text-grey05 py-24 text-center">
          표시할 상품이 없어요.
        </p>
      );
    }

    // 로딩 중 표시
    if (isLoading) {
      return (
        <div
          role="status"
          aria-busy="true"
          aria-label="상품 목록을 불러오는 중"
          className="py-24"
        />
      );
    }

    // 목록과 무한 스크롤 감지 요소
    return (
      <>
        <SelectableProductList
          products={products}
          selectedProductIds={selectedProductIds}
          onToggle={handleToggleById}
          alreadyAddedProductIds={alreadyAddedProductIds}
          onAlreadyAdded={handleAlreadyAdded}
        />
        <div ref={loadMoreRef} aria-hidden="true" className="h-px" />
      </>
    );
  };

  return (
    <div
      className={cn(
        'flex flex-col pt-13.5',
        selectedProducts.length > 0 ? 'pb-60' : 'pb-25'
      )}
    >
      {/* 헤더 영역: 뒤로가기, 제목, 저장 버튼 */}
      <PageHeader
        left={
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="이전 화면으로 이동"
          >
            <ArrowBackIcon />
          </button>
        }
        title={title}
        right={[
          <button
            key="add"
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={cn('body1-sb', canSubmit ? 'text-black' : 'text-grey04')}
          >
            추가
          </button>,
        ]}
      />

      {/* 검색 진입과 카테고리 영역: 검색창을 누르면 검색 화면으로 이동합니다. */}
      <div className="flex flex-col gap-4 px-4">
        <ProductSearchTrigger onClick={() => navigate(searchPath)} />
        <HorizontalCategoriesTab
          categories={categories}
          selectedId={selectedCategoryId ?? 0}
          onSelect={selectCategory}
          ariaLabel="상품 카테고리"
        />
      </div>

      {/* 개수 영역: 정렬은 평점순 고정이라 개수만 보여줍니다. */}
      <div className="bg-white px-4 py-3.5">
        <span className="body2-m text-grey08" aria-live="polite">
          {countLabel}
        </span>
      </div>

      {/* 본문 영역: 상품 목록 */}
      {renderProducts()}

      {/* 하단 dock 영역: 선택이 0개여도 항상 화면 하단에 고정합니다. */}
      <div className="z-header fixed bottom-0 left-1/2 w-full max-w-110 min-w-[20rem] -translate-x-1/2">
        <SelectedProductDock
          products={selectedProducts}
          onRemove={handleRemove}
        />
      </div>
    </div>
  );
};
