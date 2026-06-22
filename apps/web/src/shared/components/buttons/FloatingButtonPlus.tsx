import { Plus24Icon } from '@/shared/icons';

type FloatingButtonPlusProps = {
  onClick: () => void;
};

export const FloatingButtonPlus = ({ onClick }: FloatingButtonPlusProps) => {
  return (
    <div className="fixed bottom-10 left-1/2 w-full max-w-110 -translate-x-1/2 px-4">
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
