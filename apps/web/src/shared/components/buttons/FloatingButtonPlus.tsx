import { Plus24Icon } from '@/shared/icons';
import {
  FLOATING_PLACEMENT_CLASS,
  type FloatingPlacement,
} from '@/shared/constants/floating.constants';
import cn from '@/utils/cn';

type FloatingButtonPlusProps = {
  onClick: () => void;
  placement?: FloatingPlacement;
};

export const FloatingButtonPlus = ({
  onClick,
  placement = 'default',
}: FloatingButtonPlusProps) => {
  return (
    <div
      className={cn(
        'fixed left-1/2 w-full max-w-110 -translate-x-1/2 px-4',
        FLOATING_PLACEMENT_CLASS[placement]
      )}
    >
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClick}
          className="bg-grey09 flex size-12 items-center justify-center rounded-full"
          aria-label="추가"
        >
          <Plus24Icon className="text-white" />
        </button>
      </div>
    </div>
  );
};
