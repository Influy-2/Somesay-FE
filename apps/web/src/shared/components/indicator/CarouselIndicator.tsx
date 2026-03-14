import cn from '@/utils/cn';
interface CarouselIndicatorProps {
  count: number;
  selectedIndex: number;
}

export const CarouselIndicator = ({
  count,
  selectedIndex,
}: CarouselIndicatorProps) => {
  return (
    <div className="flex items-center gap-1.25" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'w-1',
            i === selectedIndex ? 'bg-grey08 h-2.5' : 'bg-grey03 h-1.5'
          )}
        />
      ))}
    </div>
  );
};
