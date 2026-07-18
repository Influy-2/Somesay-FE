import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { InputField } from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Shared/Input/InputField',
  component: InputField,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    errorMessage: { control: 'text' },
    helperText: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

const DefaultTemplate = () => {
  const [value, setValue] = useState('');
  return (
    <InputField
      placeholder="입력해 주세요"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

const WithErrorTemplate = () => {
  const [value, setValue] = useState('닉네임123');
  return (
    <InputField
      placeholder="입력해 주세요"
      errorMessage="올바르게 입력해 주세요."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Default: Story = {
  render: () => <DefaultTemplate />,
};

export const WithError: Story = {
  render: () => <WithErrorTemplate />,
};
