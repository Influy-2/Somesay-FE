import { useState, useRef } from 'react';
import { SearchIcon, CircleX14Icon } from '@/shared/icons';

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onClear: () => void;
  autoFocus?: boolean;
}

export const SearchBar = ({
  placeholder,
  value,
  onChange,
  onSubmit,
  onClear,
  autoFocus = false,
}: SearchBarProps) => {
  const [hasSearched, setHasSearched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const showSearchButton = !value || isFocused || !hasSearched;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasSearched(false);
    onChange(e);
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
    setHasSearched(true);
  };

  const handleFocus = () => {
    setIsFocused(true);
    formRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <form
      ref={formRef}
      role="search"
      onSubmit={handleSubmit}
      className="bg-grey01 flex h-10 w-full items-center px-2.5 py-2"
    >
      <input
        type="search"
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        aria-label={placeholder}
        autoFocus={autoFocus}
        className="body2-m placeholder:text-grey05 mr-3.5 w-full bg-transparent outline-none [&::-webkit-search-cancel-button]:appearance-none"
      />
      <div className="flex items-center gap-2">
        {value && (
          <button
            type="button"
            onClick={() => {
              onClear();
              setHasSearched(false);
            }}
            aria-label="검색어 삭제"
          >
            <CircleX14Icon />
          </button>
        )}
        {showSearchButton && (
          <button type="submit" aria-label="검색">
            <SearchIcon />
          </button>
        )}
      </div>
    </form>
  );
};
