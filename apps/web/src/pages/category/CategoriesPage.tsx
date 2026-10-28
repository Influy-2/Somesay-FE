import {
  CATEGORY_BANNER,
  CategoryAccordion,
  CategoryBanner,
} from '@/features/category';
import { PageHeader } from '@/shared/components';
import { useFetchCategories } from '@/shared/hooks';

export const CategoriesPage = () => {
  const {
    data: categoryGroups = [],
    isPending,
    isError,
  } = useFetchCategories({ throwOnError: false });

  const renderCategoryList = () => {
    // TODO: CategoryListSkeleton으로 교체
    if (isPending) {
      return (
        <p role="status" className="body2-m text-grey06 px-4">
          로딩중...
        </p>
      );
    }

    // TODO: 재시도 버튼이 있는 에러 안내 UI로 교체
    if (isError) {
      return (
        <p role="alert" className="body2-m text-grey06 px-4">
          카테고리를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
        </p>
      );
    }

    return (
      <ul aria-label="카테고리 목록" className="flex flex-col">
        {categoryGroups.map((category) => (
          <CategoryAccordion
            key={category.mainCategoryId}
            category={category}
          />
        ))}
      </ul>
    );
  };

  return (
    <div className="mt-13.5 flex flex-col">
      <PageHeader title="카테고리" />
      <CategoryBanner {...CATEGORY_BANNER} />
      <section aria-label="카테고리" className="pt-7">
        {renderCategoryList()}
      </section>
    </div>
  );
};
