import { cn } from '@/utils/cn';
import { InputFieldBase, type InputFieldBaseProps } from './InputFieldBase';

export interface VerificationCodeInputProps extends Omit<
  InputFieldBaseProps,
  'maxLength' | 'rightSlot' | 'type'
> {
  maxLength?: number;
  timerText?: string;
  isExpired?: boolean;
}

export const VerificationCodeInput = ({
  value,
  maxLength = 6,
  timerText = '04:59',
  isExpired = false,
  placeholder = '인증번호 6자리',
  inputMode = 'numeric',
  ...props
}: VerificationCodeInputProps) => {
  return (
    <InputFieldBase
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
