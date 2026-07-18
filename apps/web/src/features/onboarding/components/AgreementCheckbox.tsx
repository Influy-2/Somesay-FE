import cn from '@/utils/cn';
import { CheckOffIcon, CheckOnIcon } from '@/shared/icons';
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
        'flex size-6 shrink-0 items-center justify-center rounded-full'
      )}
    >
      {checked ? <CheckOnIcon /> : <CheckOffIcon />}
    </span>
    <span className={cn('min-w-0 text-black', labelClassName)}>{label}</span>
  </button>
);
