import { useNavigate } from 'react-router';

import {
  PageHeader,
  ProductSearchTrigger,
  ProductSelectionBrowser,
} from '@/shared/components';
import { ArrowBackIcon } from '@/shared/icons';
import cn from '@/utils/cn';

import { PRODUCT_FIT_TITLES } from '../../constants/myPage.constants';
import { useAddProductList } from '../../hooks/useAddProductList';
import { useProductFitDraftStore } from '../../stores/productFitDraft.store';

import { ProductFitCardList } from './ProductFitCardList';
import { ProductFitDock } from './ProductFitDock';
import { ProductFitSubmitButton } from './ProductFitSubmitButton';
import type { UserProductStatusType } from '@somesay/shared';

// 이 수 넘기면 9999+로 표현합니다. SortBar와 같은 표기를 쓰려고 값을 맞췄습니다.
const COUNT_OVERFLOW_THRESHOLD = 9999;

// 어느 쪽에 추가하는지와 검색 화면 경로를 받는 props입니다.
interface AddProductListProps {
  status: UserProductStatusType;
  searchPath: string;
}

export const AddProductList = ({ status, searchPath }: AddProductListProps) => {
  // 화면 이동과 카테고리·상품 목록 훅을 묶어 호출합니다.
  const navigate = useNavigate();
  const {
    categories,
    selectedCategoryId,
    selectCategory,
    products,
    productCount,
    listStatus,
    loadMoreRef,
  } = useAddProductList();

  // 선택 목록 전체가 아니라 "하나라도 있는가"만 구독해, 선택 개수가 바뀔 때 화면이 다시 그려지지 않게 합니다.
  const hasSelection = useProductFitDraftStore(
    (state) => state.selectedProducts.length > 0
  );

  // SortBar와 같은 표기로 상품 개수를 만듭니다.
  const countLabel =
    productCount >= COUNT_OVERFLOW_THRESHOLD
      ? `${COUNT_OVERFLOW_THRESHOLD.toLocaleString()}+개`
      : `${productCount.toLocaleString()}개`;

  return (
    <div
      className={cn('flex flex-col pt-13.5', hasSelection ? 'pb-60' : 'pb-25')}
    >
      {/* 헤더 영역: 뒤로가기, 제목, 저장 버튼. 저장 후에는 목록 화면에서 한 단계 뒤로 돌아갑니다. */}
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
        title={PRODUCT_FIT_TITLES[status]}
        right={[
          <ProductFitSubmitButton
            key="add"
            status={status}
            onSuccess={() => navigate(-1)}
          />,
        ]}
      />

      {/* 검색 진입 영역: 검색창을 누르면 검색 화면으로 이동합니다. */}
      <div className="px-4 pb-4">
        <ProductSearchTrigger onClick={() => navigate(searchPath)} />
      </div>

      {/* 탭·개수·목록 영역: 정렬은 평점순 고정이라 개수만 보여줍니다. */}
      <ProductSelectionBrowser
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={selectCategory}
        toolbar={
          // 위쪽 여백은 Browser의 탭 하단 여백(pb-3.5)이 이미 만들어 줍니다.
          <div className="bg-white px-4 pb-3.5">
            <span className="body2-m text-grey08" aria-live="polite">
              {countLabel}
            </span>
          </div>
        }
      >
        <ProductFitCardList
          status={status}
          products={products}
          listStatus={listStatus}
          emptyMessage="표시할 상품이 없어요."
        />
        {/* 무한 스크롤 감지 요소 */}
        <div ref={loadMoreRef} aria-hidden="true" className="h-px" />
      </ProductSelectionBrowser>

      {/* 하단 dock 영역: 선택이 0개여도 항상 화면 하단에 고정합니다. */}
      <ProductFitDock />
    </div>
  );
};
