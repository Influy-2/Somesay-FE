import { CategoryAccordion } from '@/features/category/components/CategoryAccordion';
import { CATEGORY_GROUPS } from '@somesay/shared';
import { PageHeader } from '@/shared/components';

export const CategoriesPage = () => {
  return (
    <div className="mt-13.5 flex flex-col">
      <PageHeader title="카테고리" />
      <div className="pt-5">
        <ul className="flex flex-col">
          {CATEGORY_GROUPS.map((category) => (
            <CategoryAccordion key={category.categoryId} category={category} />
          ))}
        </ul>
      </div>
    </div>
  );
};
