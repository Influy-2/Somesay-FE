import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  PageHeader,
  HorizontalCategoriesTab,
  EvaluatedProductItemHorizontal,
} from '@/shared/components';
import { ArrowBackIcon } from '@/shared/icons';
import { useFetchCategories } from '@/shared/hooks';
import { MOCK_EVALUATED_PRODUCTS_LIST } from '@/features/myPage';

export const MyReviewEvaluationProductListPage = () => {
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const { data: categoryGroups = [] } = useFetchCategories();

  const categories = [
    { id: 0, label: '전체' },
    ...categoryGroups.map((c) => ({
      id: c.mainCategoryId,
      label: c.mainCategoryName,
    })),
  ];

  const filteredProducts =
    selectedCategoryId === 0
      ? MOCK_EVALUATED_PRODUCTS_LIST
      : MOCK_EVALUATED_PRODUCTS_LIST.filter(
          (p) => p.categoryId === selectedCategoryId
        );

  return (
    <div className="mt-13.5 flex flex-col">
      <PageHeader
        title="리뷰 평가한 상품"
        left={
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="뒤로 가기"
          >
            <ArrowBackIcon aria-hidden="true" />
          </button>
        }
      />
      <div className="px-4 pt-4">
        <HorizontalCategoriesTab
          categories={categories}
          selectedId={selectedCategoryId}
          onSelect={setSelectedCategoryId}
          ariaLabel="상품 카테고리"
        />
      </div>
      <div className="px-4 py-3">
        <span className="body2-m text-grey06">{filteredProducts.length}개</span>
      </div>
      <ul className="divide-grey02 divide-y">
        {filteredProducts.map((product) => (
          <li key={product.productId}>
            <EvaluatedProductItemHorizontal
              productId={product.productId}
              productImgUrl={product.productImgUrl}
              productName={product.productName}
              brandName={product.brandName}
              reviewCount={product.reviewCount}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
