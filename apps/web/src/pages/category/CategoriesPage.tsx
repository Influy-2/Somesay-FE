import { CategoryAccordion } from '@/features/category/components/CategoryAccordion';
import { PRODUCT_SUB_CATEGORY_GROUPS } from '@somesay/shared';
import { PageHeader } from '@/shared/components';

const CATEGORIES = PRODUCT_SUB_CATEGORY_GROUPS.filter(
  (group) => group.categoryId !== 0
);

export const CategoriesPage = () => {
  return (
    <div className="mt-13.5 flex flex-col">
      <PageHeader title="카테고리" />
      <div className="pt-5">
        <ul className="flex flex-col">
          {CATEGORIES.map((category) => (
            <CategoryAccordion key={category.categoryId} category={category} />
          ))}
        </ul>
      </div>
    </div>
  );
};
