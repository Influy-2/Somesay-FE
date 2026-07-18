import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { EmailInput } from './EmailInput';

const meta: Meta<typeof EmailInput> = {
  title: 'Shared/InputField/EmailInput',
  component: EmailInput,
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
type Story = StoryObj<typeof EmailInput>;

export const Empty: Story = {
  render: function Render() {
    const [value, setValue] = useState('');

    return (
      <EmailInput
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    );
  },
};

export const Error: Story = {
  render: function Render() {
    const [value, setValue] = useState('아아아아아');

    return (
      <EmailInput
        value={value}
        errorMessage="유효한 이메일 주소를 입력해 주세요."
        onChange={(event) => setValue(event.target.value)}
      />
    );
  },
};

export const WithSuggestions: Story = {
  render: function Render() {
    const [value, setValue] = useState('Somesay');

    return (
      <EmailInput
        value={value}
        suggestions={[
          'Somesay@gmail.com',
          'Somesay@naver.com',
          'Somesay@daum.net',
          'Somesay@nate.com',
        ]}
        onSuggestionSelect={setValue}
        onChange={(event) => setValue(event.target.value)}
      />
    );
  },
};
