// apps/web/src/shared/components/productCard/AvatarStack.tsx

interface AvatarItem {
  name: string;
  profileImageUrl: string;
}

interface AvatarStackProps {
  creators: AvatarItem[];
}

export const AvatarStack = ({ creators }: AvatarStackProps) => {
  return (
    <div className="flex flex-row-reverse items-center">
      {[...creators].reverse().map((creator, index, arr) => (
        <div
          key={creator.name}
          className="relative size-5.5 overflow-hidden rounded-full border border-white"
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
