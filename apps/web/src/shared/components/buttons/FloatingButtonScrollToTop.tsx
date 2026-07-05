// shared/components/buttons/상단으로 바로 가기 플로팅 버튼
import { ScrollTopIcon } from '@/shared/icons';
import { cn } from '@/utils/cn';

interface FloatingButtonScrollToTopProps {
  className?: string;
}

export const FloatingButtonScrollToTop = ({
  className,
}: FloatingButtonScrollToTopProps) => {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="상단으로 바로 가기"
      className={cn(
        'flex size-11 items-center justify-center rounded-full shadow-md',
        className
      )}
    >
      <ScrollTopIcon className="h-full w-full" />
    </button>
  );
};
