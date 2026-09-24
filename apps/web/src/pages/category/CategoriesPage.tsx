import {
  CATEGORY_BANNER,
  CategoryAccordion,
  CategoryBanner,
} from '@/features/category';
import { PageHeader } from '@/shared/components';
import { useFetchCategories } from '@/shared/hooks';

export const CategoriesPage = () => {
  const { data: categoryGroups = [] } = useFetchCategories();

  return (
    <div className="mt-13.5 flex flex-col">
      <PageHeader title="카테고리" />
      <CategoryBanner {...CATEGORY_BANNER} />
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
