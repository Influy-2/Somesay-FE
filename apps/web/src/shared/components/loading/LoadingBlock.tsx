import cn from '@/utils/cn';

interface LoadingBlockProps {
  className?: string;
}

export const LoadingBlock = ({ className }: LoadingBlockProps) => (
  <div
    aria-hidden="true"
    className={cn(
      'bg-grey02 border-grey02 animate-pulse motion-reduce:animate-none',
      className
    )}
  />
);
