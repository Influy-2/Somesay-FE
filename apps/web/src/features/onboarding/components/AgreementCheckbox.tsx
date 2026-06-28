import cn from '@/utils/cn';

interface AgreementCheckboxProps {
  checked: boolean;
  label: string;
  onChange: () => void;
  labelClassName?: string;
  className?: string;
}

export const AgreementCheckbox = ({
  checked,
  label,
  onChange,
  labelClassName,
  className,
}: AgreementCheckboxProps) => (
  <button
    type="button"
    role="checkbox"
    aria-checked={checked}
    onClick={onChange}
    className={cn('flex min-w-0 items-center gap-3 text-left', className)}
  >
    <span
      aria-hidden="true"
      className={cn(
        'flex size-6 shrink-0 items-center justify-center rounded-full border-[1.8px]',
        checked ? 'border-black bg-black' : 'border-grey04 bg-white'
      )}
    >
      {checked && (
        <svg
          width="12"
          height="9"
          viewBox="0 0 12 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 4L4.5 7.5L11 1"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="square"
          />
        </svg>
      )}
    </span>
    <span className={cn('min-w-0 text-black', labelClassName)}>{label}</span>
  </button>
);
