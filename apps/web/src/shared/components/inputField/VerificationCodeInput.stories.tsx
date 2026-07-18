import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { VerificationCodeInput } from './VerificationCodeInput';

const meta: Meta<typeof VerificationCodeInput> = {
  title: 'Shared/InputField/VerificationCodeInput',
  component: VerificationCodeInput,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[358px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof VerificationCodeInput>;

export const Empty: Story = {
  render: function Render() {
    const [value, setValue] = useState('');

    return (
      <VerificationCodeInput
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    );
  },
};

export const Error: Story = {
  render: function Render() {
    const [value, setValue] = useState('123456');

    return (
      <VerificationCodeInput
        value={value}
        errorMessage="인증번호가 일치하지 않습니다."
        onChange={(event) => setValue(event.target.value)}
      />
    );
  },
};

export const Expired: Story = {
  render: function Render() {
    const [value, setValue] = useState('');

    return (
      <VerificationCodeInput
        value={value}
        timerText="00:00"
        isExpired
        errorMessage="인증 시간이 만료되었습니다."
        onChange={(event) => setValue(event.target.value)}
      />
    );
  },
};
