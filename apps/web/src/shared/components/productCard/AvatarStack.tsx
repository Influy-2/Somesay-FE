// apps/web/src/shared/components/productCard/AvatarStack.tsx
import cn from '@/utils/cn';
interface AvatarItem {
  name: string;
  profileImageUrl: string;
}

interface AvatarStackProps {
  creators: AvatarItem[];
  borderColor?: string;
}

export const AvatarStack = ({
  creators,
  borderColor = 'border-white',
}: AvatarStackProps) => {
  return (
    <div className="flex flex-row-reverse items-center">
      {[...creators].reverse().map((creator, index, arr) => (
        <div
          key={creator.name}
          className={cn(
            `relative size-5.5 overflow-hidden rounded-full border`,
            borderColor
          )}
          style={{ marginLeft: index === arr.length - 1 ? 0 : -6 }}
        >
          <img
            src={creator.profileImageUrl}
            alt=""
            className="size-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};
