import { useState } from 'react';
import { Link } from 'react-router';
import { CategoryType } from '@somesay/shared';
import MainArrowIcon from '@/shared/icons/MainArrowIcon.svg?react';

interface CategoryAccordionProps {
  category: CategoryType;
}

export const CategoryAccordion = ({ category }: CategoryAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const subListId = `subcategory-list-${category.id}`;

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
            {/* TODO: 나중에 실제 카테고리 아이콘으로 교체 */}
            <div className="bg-grey04 h-9 w-9 rounded-full" />
            <span className="body1-sb">{category.title}</span>
          </div>
        </button>
        {/* TODO: 나중에 대분류 페이지로 이동 */}
        <Link to={`/`} aria-label={`${category.title} 전체보기 페이지로 이동`}>
          <MainArrowIcon />
        </Link>
      </div>
      {/* 소분류 목록 렌더링 */}

      <ul
        id={subListId}
        role="region"
        className={`flex flex-col gap-6 px-8 pt-6 ${!isOpen ? 'hidden' : ''}`}
      >
        {category.subCategories?.map((sub) => (
          <li key={sub.id} className="body2-m cursor-pointer">
            {sub.name}
          </li>
        ))}
      </ul>
      <hr className="border-grey03 mx-4 my-7 border-t" aria-hidden="true" />
    </li>
  );
};
