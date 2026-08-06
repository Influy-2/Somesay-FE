// Tab/일치하는 제품 등등 탭 하나 컴포넌트
import cn from '@/utils/cn';

export interface TabItemProps {
  tabText: string;
  isActive: boolean;
  onClick: () => void;
  id?: string;
  controls?: string;
}

export const TabItem = ({
  tabText,
  isActive,
  onClick,
  id,
  controls,
}: TabItemProps) => {
  return (
    <button
      type="button"
      role="tab"
      id={id}
      aria-controls={controls}
      aria-selected={isActive}
      onClick={onClick}
      className={cn(
        'body2-m -mb-0.5 flex flex-1 items-center justify-center border-b-2 py-3',
        isActive ? 'border-black text-black' : 'border-grey02 text-grey06'
      )}
    >
      {tabText}
    </button>
  );
};
