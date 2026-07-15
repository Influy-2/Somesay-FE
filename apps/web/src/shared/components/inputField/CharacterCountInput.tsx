import { InputFieldBase, type InputFieldBaseProps } from './InputFieldBase';

export interface CharacterCountInputProps extends Omit<
  InputFieldBaseProps,
  'maxLength' | 'rightSlot'
> {
  maxLength?: number;
  allowLengthOverflow?: boolean;
}

export const CharacterCountInput = ({
  value,
  maxLength = 12,
  allowLengthOverflow = false,
  helperText = '한글, 영어, 숫자로 구성된 닉네임을 입력해 주세요.',
  placeholder = '닉네임을 입력해 주세요',
  ...props
}: CharacterCountInputProps) => {
  return (
    <InputFieldBase
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
