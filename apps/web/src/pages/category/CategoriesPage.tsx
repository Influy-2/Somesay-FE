import { CategoryAccordion } from '@/features/category/components/CategoryAccordion';
import { PageHeader } from '@/shared/components';
import { useFetchCategories } from '@/shared/hooks';

export const CategoriesPage = () => {
  const { data: categoryGroups = [] } = useFetchCategories();

  return (
    <div className="mt-13.5 flex flex-col">
      <PageHeader title="카테고리" />
      <div className="pt-5">
        <ul className="flex flex-col">
          {categoryGroups.map((category) => (
            <CategoryAccordion
              key={category.mainCategoryId}
              category={category}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
