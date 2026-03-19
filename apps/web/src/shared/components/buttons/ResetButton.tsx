interface ResetButtonProps {
  label?: string;
  onClick: () => void;
}

export const ResetButton = ({
  label = '초기화',
  onClick,
}: ResetButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border-grey04 flex h-12 w-[calc((100%-.5rem)/3)] shrink-0 items-center justify-center border px-3 py-1"
      aria-label={label}
    >
      <span className="body1-sb whitespace-nowrap text-black">{label}</span>
    </button>
  );
};
