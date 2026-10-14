import type { ReactNode } from 'react';

import cn from '@/utils/cn';

import { HorizontalCategoriesTab } from '../category/HorizontalCategoriesTab';

import type { ProductSelectionCategory } from './productSelection.types';

// 탭·툴바 슬롯·목록을 한 레이아웃으로 묶는 props입니다.
interface ProductSelectionBrowserProps {
  categories: ProductSelectionCategory[];
  selectedCategoryId: number;
  onSelectCategory: (categoryId: number) => void;
  /** 개수·정렬 등을 둘 영역입니다. 없으면 그리지 않습니다. */
  toolbar?: ReactNode;
  /** 보통 SelectableProductCardList입니다. */
  children: ReactNode;
  /** 바깥 여백은 화면마다 달라 호출부가 정합니다. */
  className?: string;
}

/**
 * 카테고리 탭 + 툴바 슬롯 + 상품 목록을 세로로 쌓는 레이아웃입니다.
 * 목록을 children으로 받는 이유는 화면마다 스크롤 컨테이너와 무한 스크롤 감지 요소가 달라서,
 * 이 컴포넌트가 목록의 스크롤 구조까지 정하면 안 되기 때문입니다.
 */
export const ProductSelectionBrowser = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
  toolbar,
  children,
  className,
}: ProductSelectionBrowserProps) => (
  <section aria-label="상품 선택" className={cn('flex flex-col', className)}>
    {/* 탭 아래 pb-3.5는 기존 검색 결과 헤더의 하단 여백을 이어받은 값입니다. */}
    <div className="px-4 pb-3.5">
      <HorizontalCategoriesTab
        categories={categories}
        selectedId={selectedCategoryId}
        onSelect={onSelectCategory}
        ariaLabel="상품 카테고리"
      />
    </div>
    {toolbar}
    {children}
  </section>
);
