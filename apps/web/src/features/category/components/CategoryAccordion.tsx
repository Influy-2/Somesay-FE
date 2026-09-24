import { useState } from 'react';
import { Link } from 'react-router';
import type { CategoryGroupType } from '@somesay/shared';
import { MainArrowIcon } from '@/shared/icons';
import cn from '@/utils/cn';
import { PATH } from '@/routes/path';

interface CategoryAccordionProps {
  category: CategoryGroupType;
}

export const CategoryAccordion = ({ category }: CategoryAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const subListId = `subcategory-list-${category.mainCategoryId}`;

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <li className="list-none">
      <div className="flex items-center px-4">
        <button
          type="button"
          onClick={toggleAccordion}
          aria-expanded={isOpen}
          aria-controls={subListId}
          className="flex w-full cursor-pointer items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <img
              src={category.imageUrl}
              alt=""
              className="bg-grey04 size-9 rounded-full object-cover"
            />
            <span className={isOpen ? 'subhead-b' : 'subhead-sb'}>
              {category.mainCategoryName}
            </span>
          </div>
        </button>
        <Link
          to={`${PATH.CATEGORIES.BASE}/${category.mainCategoryId}`}
          aria-label={`${category.mainCategoryName} 전체보기 페이지로 이동`}
        >
          <MainArrowIcon />
        </Link>
      </div>

      {/* 소분류 목록 렌더링 */}
      <ul
        id={subListId}
        role="region"
        className={cn('flex flex-col gap-6 px-8 pt-6', !isOpen && 'hidden')}
      >
        {category.subCategories.map((sub) => (
          <li key={sub.subCategoryId}>
            <Link
              to={`${PATH.CATEGORIES.BASE}/${category.mainCategoryId}?subcategory=${sub.subCategoryId}`}
              className="body2-m cursor-pointer"
            >
              {sub.subCategoryName}
            </Link>
          </li>
        ))}
      </ul>
      <hr className="border-grey02 mx-4 my-7 border-t" aria-hidden="true" />
    </li>
  );
};
