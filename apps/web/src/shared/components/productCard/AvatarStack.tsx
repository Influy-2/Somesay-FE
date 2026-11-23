// apps/web/src/shared/components/productCard/AvatarStack.tsx
import cn from '@/utils/cn';

// 디자인상 프로필은 최대 3개까지만 노출합니다.
const MAX_VISIBLE_AVATARS = 3;

interface AvatarStackProps {
  creatorProfileImgUrls: string[];
  borderColor?: string;
}

export const AvatarStack = ({
  creatorProfileImgUrls,
  borderColor = 'border-white',
}: AvatarStackProps) => {
  const visibleImgUrls = creatorProfileImgUrls.slice(0, MAX_VISIBLE_AVATARS);

  return (
    <div className="flex flex-row-reverse items-center">
      {[...visibleImgUrls].reverse().map((imgUrl, index, arr) => (
        <div
          key={`${imgUrl}-${index}`}
          className={cn(
            `relative size-5.5 overflow-hidden rounded-full border`,
            borderColor
          )}
          style={{ marginLeft: index === arr.length - 1 ? 0 : -6 }}
        >
          <img src={imgUrl} alt="" className="size-full object-cover" />
        </div>
      ))}
    </div>
  );
};
