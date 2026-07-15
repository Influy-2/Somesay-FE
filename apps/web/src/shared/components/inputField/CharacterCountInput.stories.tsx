import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CharacterCountInput } from './CharacterCountInput';

const meta: Meta<typeof CharacterCountInput> = {
  title: 'Shared/InputField/CharacterCountInput',
  component: CharacterCountInput,
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
type Story = StoryObj<typeof CharacterCountInput>;

export const Empty: Story = {
  render: function Render() {
    const [value, setValue] = useState('');

    return (
      <CharacterCountInput
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    );
  },
};

export const Error: Story = {
  render: function Render() {
    const [value, setValue] = useState('닉네임123s_');

    return (
      <CharacterCountInput
        value={value}
        errorMessage="닉네임은 한글, 영어, 숫자만 사용할 수 있습니다."
        onChange={(event) => setValue(event.target.value)}
      />
    );
  },
};

export const OverflowAllowed: Story = {
  render: function Render() {
    const [value, setValue] = useState('닉네임1234567890');

    return (
      <CharacterCountInput
        value={value}
        allowLengthOverflow
        onChange={(event) => setValue(event.target.value)}
      />
    );
  },
};
