import { useState } from 'react';
import { useParams } from 'react-router';
import {
  SubCategoryHeader,
  SubCategorySortBar,
  ProductList,
} from '@/features/subcategory';
import { MOCK_SUBCATEGORY_PRODUCTS } from '@/features/subcategory';
import { HorizontalCategoriesTab } from '@/shared/components/category/HorizontalCategoriesTab';

const CATEGORY_MOCK_DATA = [
  {
    id: 1,
    title: '스킨케어',
    subCategories: [
      { id: 101, name: '스킨/토너' },
      { id: 102, name: '로션/에멀전' },
      { id: 103, name: '에센스/앰플/세럼' },
      { id: 104, name: '크림' },
      { id: 105, name: '미스트/오일' },
    ],
  },
  {
    id: 2,
    title: '클렌징',
    subCategories: [
      { id: 201, name: '클렌징 폼' },
      { id: 202, name: '클렌징 오일' },
    ],
  },
];

export const SubCategoriesPage = () => {
  const { categoryId } = useParams();
  const [selectedId, setSelectedId] = useState(0);

  const currentCategory = CATEGORY_MOCK_DATA.find(
    (c) => c.id === Number(categoryId)
  );
  const categoryTitle = currentCategory?.title ?? '';

  const tabCategories = [
    { id: 0, title: '전체' },
    ...(currentCategory?.subCategories?.map((sub) => ({
      id: sub.id,
      title: sub.name,
    })) ?? []),
  ];

  const filteredCount =
    selectedId === 0
      ? MOCK_SUBCATEGORY_PRODUCTS.filter(
          (p) => p.categoryId === Number(categoryId)
        ).length
      : MOCK_SUBCATEGORY_PRODUCTS.filter((p) => p.subCategoryId === selectedId)
          .length;

  return (
    <div className="min-dvh-screen flex flex-col bg-white">
      <SubCategoryHeader title={currentCategory?.title ?? ''} />
      <div className="pt-5" />
      <div className="px-4">
        <HorizontalCategoriesTab
          categories={tabCategories}
          selectedId={selectedId}
          onSelect={setSelectedId}
          ariaLabel={`${categoryTitle} 소분류 카테고리`}
        />
      </div>
      <div className="pt-4" />
      <SubCategorySortBar productCount={filteredCount} />
      <div className="pt-6" />
      <ProductList
        categoryId={Number(categoryId)}
        selectedSubCategoryId={selectedId}
      />
    </div>
  );
};
