import { Star16Icon } from '@/shared/icons';
import cn from '@/utils/cn';

interface StarRatingProps {
  rating: number;
}
// TODO: 디자인 수정에 따른 수정 필요
export const StarRating = ({ rating }: StarRatingProps) => {
  const filled = Math.round(rating);

  return (
    <div
      className="flex items-center gap-px"
      aria-label={`별점 ${rating}점`}
      aria-hidden="true"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star16Icon
          key={i}
          className={cn('size-4', i < filled ? 'text-black' : 'text-grey03')}
        />
      ))}
    </div>
  );
};
