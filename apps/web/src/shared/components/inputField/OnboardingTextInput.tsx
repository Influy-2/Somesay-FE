import {
  useId,
  type ChangeEventHandler,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '@/utils/cn';

type OnboardingInputState = 'empty' | 'filled' | 'error';

interface OnboardingTextInputBaseProps extends Omit<
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

const getInputState = (
  value: string,
  errorMessage?: string
): OnboardingInputState => {
  if (errorMessage) return 'error';
  if (value.length > 0) return 'filled';
  return 'empty';
};

const OnboardingTextInputBase = ({
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
}: OnboardingTextInputBaseProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const message = errorMessage ?? helperText;
  const messageId = message ? `${inputId}-message` : undefined;
  const state = getInputState(value, errorMessage);

  return (
    <div className={cn('flex w-full flex-col items-center', className)}>
      <div
        className={cn(
          'bg-grey01 flex h-[42px] w-full items-center justify-center px-3 py-2 focus-within:ring-1',
          state === 'error'
            ? 'border-error border focus-within:ring-0'
            : 'focus-within:ring-0',
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
            'body2-m placeholder:text-grey05 min-w-0 flex-1 bg-transparent text-black',
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

export interface OnboardingNicknameInputProps extends Omit<
  OnboardingTextInputBaseProps,
  'rightSlot' | 'type'
> {
  maxLength?: number;
  allowLengthOverflow?: boolean;
}

export const OnboardingNicknameInput = ({
  value,
  maxLength = 12,
  allowLengthOverflow = false,
  helperText = '한글, 영어, 숫자로 구성된 닉네임을 입력해 주세요.',
  placeholder = '닉네임을 입력해 주세요',
  ...props
}: OnboardingNicknameInputProps) => {
  return (
    <OnboardingTextInputBase
      value={value}
      {...(allowLengthOverflow ? {} : { maxLength })}
      helperText={helperText}
      placeholder={placeholder}
      rightSlot={
        <span className="body2-m text-grey05">
          {value.length}/{maxLength}
        </span>
      }
      {...props}
    />
  );
};

export interface OnboardingVerificationCodeInputProps extends Omit<
  OnboardingTextInputBaseProps,
  'rightSlot' | 'type'
> {
  maxLength?: number;
  timerText?: string;
  isExpired?: boolean;
}

export const OnboardingVerificationCodeInput = ({
  value,
  maxLength = 6,
  timerText = '04:59',
  isExpired = false,
  placeholder = '인증번호 6자리',
  inputMode = 'numeric',
  ...props
}: OnboardingVerificationCodeInputProps) => {
  return (
    <OnboardingTextInputBase
      value={value}
      maxLength={maxLength}
      inputMode={inputMode}
      placeholder={placeholder}
      rightSlot={
        <span className={cn('body2-m text-grey08', isExpired && 'text-error')}>
          {timerText}
        </span>
      }
      {...props}
    />
  );
};

type OnboardingEmailInputBaseProps = Omit<
  OnboardingTextInputBaseProps,
  'type' | 'belowSlot'
>;

type OnboardingEmailSuggestionsProps =
  | {
      suggestions?: never;
      onSuggestionSelect?: never;
    }
  | {
      suggestions: string[];
      onSuggestionSelect: (suggestion: string) => void;
    };

export type OnboardingEmailInputProps = OnboardingEmailInputBaseProps &
  OnboardingEmailSuggestionsProps;

export const OnboardingEmailInput = ({
  value,
  suggestions,
  onSuggestionSelect,
  placeholder = '이메일을 입력해주세요',
  autoComplete = 'email',
  ...props
}: OnboardingEmailInputProps) => {
  const suggestionItems = suggestions ? [...new Set(suggestions)] : [];
  const hasSuggestions =
    suggestionItems.length > 0 && onSuggestionSelect !== undefined;

  return (
    <OnboardingTextInputBase
      value={value}
      type="email"
      autoComplete={autoComplete}
      placeholder={placeholder}
      belowSlot={
        hasSuggestions ? (
          <ul
            aria-label="이메일 주소 추천"
            className="border-grey02 mt-1 flex w-full flex-col gap-4 border bg-white p-3"
          >
            {suggestionItems.map((suggestion) => (
              <li key={suggestion}>
                <button
                  type="button"
                  className="body2-m text-grey06 h-[21px] w-full text-left focus-visible:underline"
                  onClick={() => onSuggestionSelect(suggestion)}
                >
                  {suggestion}
                </button>
              </li>
            ))}
          </ul>
        ) : null
      }
      {...props}
    />
  );
};
