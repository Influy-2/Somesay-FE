import {
  useId,
  type ChangeEventHandler,
  type TextareaHTMLAttributes,
} from 'react';
import { cn } from '@/utils/cn';

export interface TextAreaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'aria-describedby' | 'aria-invalid' | 'className' | 'onChange' | 'value'
> {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  maxLength?: number;
  errorMessage?: string;
  helperText?: string;
  className?: string;
  fieldClassName?: string;
  textAreaClassName?: string;
}

export const TextArea = ({
  value,
  onChange,
  maxLength = 500,
  errorMessage,
  helperText,
  className,
  fieldClassName,
  textAreaClassName,
  id,
  placeholder = '문의 내용을 입력해 주세요.',
  ...textAreaProps
}: TextAreaProps) => {
  const generatedId = useId();
  const textAreaId = id ?? generatedId;
  const message = errorMessage ?? helperText;
  const messageId = message ? `${textAreaId}-message` : undefined;
  const hasError = Boolean(errorMessage);

  return (
    <div className={cn('flex w-full flex-col items-end', className)}>
      <div
        className={cn(
          'bg-grey01 flex w-full p-3',
          hasError && 'border-error border',
          fieldClassName
        )}
      >
        <textarea
          {...textAreaProps}
          id={textAreaId}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          placeholder={placeholder}
          aria-invalid={hasError ? true : undefined}
          aria-describedby={messageId}
          className={cn(
            'body2-m placeholder:text-grey06 h-[126px] w-full resize-none bg-transparent text-black outline-none',
            textAreaClassName
          )}
        />
      </div>

      <span className="body2-m text-grey05 mt-2">
        {value.length}/{maxLength}
      </span>

      {message && (
        <p
          id={messageId}
          role={hasError ? 'alert' : undefined}
          className={cn(
            'caption1-m mt-2 w-full px-1',
            hasError ? 'text-error' : 'text-grey06'
          )}
        >
          {message}
        </p>
      )}
    </div>
  );
};
