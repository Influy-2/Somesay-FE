import { SearchIcon } from '@/shared/icons';

interface ProductSearchTriggerProps {
  onClick: () => void;
}

export const ProductSearchTrigger = ({
  onClick,
}: ProductSearchTriggerProps) => (
  <button
    type="button"
    onClick={onClick}
    className="bg-grey01 flex h-10 w-full items-center justify-between px-2.5 py-2 text-left"
  >
    <span className="body2-m text-grey05">제품명 또는 브랜드명 검색</span>
    <SearchIcon />
  </button>
);
