// apps/web/src/shared/components/productCard/AvatarStack.tsx
import cn from '@/utils/cn';

interface AvatarStackProps {
  creatorImageUrls: string[];
  borderColor?: string;
}

export const AvatarStack = ({
  creatorImageUrls,
  borderColor = 'border-white',
}: AvatarStackProps) => {
  return (
    <div className="flex flex-row-reverse items-center">
      {[...creatorImageUrls].reverse().map((imageUrl, index, arr) => (
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
