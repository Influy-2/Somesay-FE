import {
  useId,
  type ChangeEventHandler,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import cn from '@/utils/cn';

type InputFieldState = 'empty' | 'filled' | 'error';

export interface InputFieldBaseProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'aria-describedby' | 'aria-invalid' | 'className' | 'onChange' | 'value'
> {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  errorMessage?: string;
  helperText?: string;
  rightSlot?: ReactNode;
  belowSlot?: ReactNode;
  className?: string;
  fieldClassName?: string;
  inputClassName?: string;
}

const getInputFieldState = (
  value: string,
  errorMessage?: string
): InputFieldState => {
  if (errorMessage) return 'error';
  if (value.length > 0) return 'filled';
  return 'empty';
};

export const InputFieldBase = ({
  value,
  onChange,
  errorMessage,
  helperText,
  rightSlot,
  belowSlot,
  className,
  fieldClassName,
  inputClassName,
  id,
  ...inputProps
}: InputFieldBaseProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const message = errorMessage ?? helperText;
  const messageId = message ? `${inputId}-message` : undefined;
  const state = getInputFieldState(value, errorMessage);

  return (
    <div className={cn('flex w-full flex-col items-center', className)}>
      <div
        className={cn(
          'bg-grey01 flex h-[42px] w-full items-center px-3 py-2',
          state === 'error' && 'border-error border',
          fieldClassName
        )}
        data-state={state}
      >
        <input
          {...inputProps}
          id={inputId}
          value={value}
          onChange={onChange}
          aria-invalid={state === 'error' ? true : undefined}
          aria-describedby={messageId}
          className={cn(
            'body2-m placeholder:text-grey05 min-w-0 flex-1 bg-transparent text-black outline-none',
            inputClassName
          )}
        />
        {rightSlot && <div className="shrink-0">{rightSlot}</div>}
      </div>

      {message && (
        <p
          id={messageId}
          role={state === 'error' ? 'alert' : undefined}
          className={cn(
            'caption1-m mt-2 w-full px-1',
            state === 'error' ? 'text-error' : 'text-grey06'
          )}
        >
          {message}
        </p>
      )}

      {belowSlot}
    </div>
  );
};
