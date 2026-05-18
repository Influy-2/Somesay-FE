import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { InputField } from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Shared/Input/InputField',
  component: InputField,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    maxLength: { control: 'number' },
    errorMessage: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

const DefaultTemplate = () => {
  const [value, setValue] = useState('');
  return (
    <InputField
      placeholder="닉네임을 입력해주세요"
      maxLength={12}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

const WithErrorTemplate = () => {
  const [value, setValue] = useState('닉네임123');
  return (
    <InputField
      placeholder="닉네임을 입력해주세요"
      maxLength={12}
      errorMessage="이미 사용 중인 닉네임입니다."
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
