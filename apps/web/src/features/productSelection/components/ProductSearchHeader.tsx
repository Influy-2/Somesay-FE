import type { ChangeEventHandler } from 'react';
import {
  HorizontalCategoriesTab,
  PageHeader,
  SearchBar,
} from '@/shared/components';
import { ArrowBackIcon } from '@/shared/icons';
import type { ProductCategory } from '../types/productSelection.types';

interface ProductSearchHeaderBaseProps {
  value: string;
  backLabel: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onSubmit: () => void;
  onClear: () => void;
  onBack: () => void;
}

type ProductSearchHeaderProps =
  | (ProductSearchHeaderBaseProps & {
      mode: 'input';
    })
  | (ProductSearchHeaderBaseProps & {
      mode: 'result';
      categories: ProductCategory[];
      selectedCategoryId: number;
      onSelectCategory: (categoryId: number) => void;
    });

const BackButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <button type="button" onClick={onClick} aria-label={label}>
    <ArrowBackIcon />
  </button>
);

export const ProductSearchHeader = (props: ProductSearchHeaderProps) => {
  const searchBar = (
    <SearchBar
      placeholder="제품명 또는 브랜드명 검색"
      value={props.value}
      onChange={props.onChange}
      onSubmit={props.onSubmit}
      onClear={props.onClear}
      autoFocus={props.mode === 'input'}
    />
  );

  if (props.mode === 'input') {
    return (
      <header className="z-header fixed top-0 flex h-13.5 w-full max-w-110 min-w-[20rem] items-center gap-3 bg-white px-4 py-2.5">
        <BackButton label={props.backLabel} onClick={props.onBack} />
        <div className="min-w-0 flex-1">{searchBar}</div>
      </header>
    );
  }

  return (
    <div className="flex flex-col gap-4 pb-3.5">
      <PageHeader
        title="검색 결과"
        left={<BackButton label={props.backLabel} onClick={props.onBack} />}
      />
      <div className="flex flex-col gap-4 px-4">
        {searchBar}
        <HorizontalCategoriesTab
          categories={props.categories}
          selectedId={props.selectedCategoryId}
          onSelect={props.onSelectCategory}
          ariaLabel="상품 카테고리"
        />
      </div>
    </div>
  );
};
