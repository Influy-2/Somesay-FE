import { CategoryAccordion } from '@/features/category/components/CategoryAccordion';
import { Link } from 'react-router';
import { PageHeader } from '@/shared/components';
import { useFetchCategories } from '@/shared/hooks';

export const CategoriesPage = () => {
  const { data: categoryGroups = [] } = useFetchCategories();

  return (
    <div className="mt-13.5 flex flex-col">
      <PageHeader title="카테고리" />
      <Link to="/categories/daiso">
        <div className="bg-grey03 mt-5 flex h-29.5 items-center justify-center">
          <span className="body2-m">임시 배너</span>
        </div>
      </Link>
      <div className="pt-7">
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
