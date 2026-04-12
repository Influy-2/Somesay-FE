import cn from '@/utils/cn';

interface OnOffButtonProps {
  isOn: boolean;
  onToggle: () => void;
  ariaLabel?: string;
}

export const OnOffButton = ({
  isOn,
  onToggle,
  ariaLabel,
}: OnOffButtonProps) => {
  return (
    <button
      type="button"
      role="switch"
      aria-label={ariaLabel}
      aria-checked={isOn}
      onClick={onToggle}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out',
        isOn ? 'bg-black' : 'bg-grey04'
      )}
    >
      <span
        className={`inline-block size-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
          isOn ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
};
