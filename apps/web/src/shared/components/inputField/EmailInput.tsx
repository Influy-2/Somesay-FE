import { InputFieldBase, type InputFieldBaseProps } from './InputFieldBase';

type EmailInputBaseProps = Omit<
  InputFieldBaseProps,
  'belowSlot' | 'rightSlot' | 'type'
>;

type EmailSuggestionsProps =
  | {
      suggestions?: never;
      onSuggestionSelect?: never;
    }
  | {
      suggestions: string[];
      onSuggestionSelect: (suggestion: string) => void;
    };

export type EmailInputProps = EmailInputBaseProps & EmailSuggestionsProps;

export const EmailInput = ({
  value,
  suggestions,
  onSuggestionSelect,
  placeholder = '이메일을 입력해 주세요',
  autoComplete = 'email',
  ...props
}: EmailInputProps) => {
  const suggestionItems = suggestions ? [...new Set(suggestions)] : [];
  const hasSuggestions =
    suggestionItems.length > 0 && onSuggestionSelect !== undefined;

  return (
    <InputFieldBase
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
                  onPointerDown={(event) => {
                    event.preventDefault();
                    onSuggestionSelect(suggestion);
                  }}
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
