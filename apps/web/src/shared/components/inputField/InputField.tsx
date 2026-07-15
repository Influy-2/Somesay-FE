import { InputFieldBase, type InputFieldBaseProps } from './InputFieldBase';

export type InputFieldProps = Omit<
  InputFieldBaseProps,
  'rightSlot' | 'belowSlot'
>;

export const InputField = (props: InputFieldProps) => {
  return <InputFieldBase {...props} />;
};
