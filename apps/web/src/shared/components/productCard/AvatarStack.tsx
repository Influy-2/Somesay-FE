// apps/web/src/shared/components/productCard/AvatarStack.tsx
import cn from '@/utils/cn';

// 디자인상 프로필은 최대 3개까지만 노출합니다.
const MAX_VISIBLE_AVATARS = 3;

interface AvatarStackProps {
  creatorImageUrls: string[];
  borderColor?: string;
}

export const AvatarStack = ({
  creatorImageUrls,
  borderColor = 'border-white',
}: AvatarStackProps) => {
  const visibleImageUrls = creatorImageUrls.slice(0, MAX_VISIBLE_AVATARS);

  return (
    <div className="flex flex-row-reverse items-center">
      {[...visibleImageUrls].reverse().map((imageUrl, index, arr) => (
        <div
          key={`${imageUrl}-${index}`}
          className={cn(
            `relative size-5.5 overflow-hidden rounded-full border`,
            borderColor
          )}
          style={{ marginLeft: index === arr.length - 1 ? 0 : -6 }}
        >
          <img src={imageUrl} alt="" className="size-full object-cover" />
        </div>
      ))}
    </div>
  );
};
