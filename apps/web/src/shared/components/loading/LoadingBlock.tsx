import cn from '@/utils/cn';

interface LoadingBlockProps {
  className?: string;
}

export const LoadingBlock = ({ className }: LoadingBlockProps) => (
  <div
    aria-hidden="true"
    className={cn('bg-grey01 animate-pulse', className)}
  />
);
