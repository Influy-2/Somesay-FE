import cn from '@/utils/cn';

interface CTAButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export const CTAButton = ({
  label,
  onClick,
  disabled = false,
}: CTAButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex h-12 w-full flex-1 items-center justify-center px-3 py-1 transition-colors',
        disabled ? 'bg-grey04 cursor-not-allowed' : 'cursor-pointer bg-black'
      )}
      aria-label={label}
      aria-disabled={disabled}
    >
      <span className="body1-sb whitespace-nowrap text-white">{label}</span>
    </button>
  );
};
