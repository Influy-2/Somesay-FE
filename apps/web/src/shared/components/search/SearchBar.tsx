import { useState, useRef } from 'react';
import { SearchIcon } from '@/shared/icons';
import { CircleX14Icon } from '@/shared/icons';

interface SearchBarProps {
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: () => void;
  onClear?: () => void;
}

export const SearchBar = ({
  placeholder,
  value = '',
  onChange,
  onSubmit,
  onClear,
}: SearchBarProps) => {
  const [isSearched, setIsSearched] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit?.();
      setIsSearched(true);
    }
  };

  const handleFocus = () => {
    containerRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div
      ref={containerRef}
      className="bg-grey01 flex h-10 w-full items-center px-2.5 py-2"
    >
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        placeholder={placeholder}
        className="body2-m placeholder:text-grey05 mr-3.5 w-full bg-transparent outline-none"
      />
      <div className="flex items-center gap-2">
        {value && (
          <button
            type="button"
            onClick={() => {
              onClear?.();
              setIsSearched(false);
            }}
            aria-label="검색어 삭제"
          >
            <CircleX14Icon />
          </button>
        )}
        {!isSearched && (
          <button
            type="button"
            onClick={() => {
              onSubmit?.();
              setIsSearched(true);
            }}
            aria-label="검색"
          >
            <SearchIcon />
          </button>
        )}
      </div>
    </div>
  );
};
