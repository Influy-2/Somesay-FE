import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'Shared/InputField/TextArea',
  component: TextArea,
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
type Story = StoryObj<typeof TextArea>;

export const Empty: Story = {
  render: function Render() {
    const [value, setValue] = useState('');

    return (
      <TextArea
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    );
  },
};

export const Filled: Story = {
  render: function Render() {
    const [value, setValue] = useState(
      '어제부터 시도했는데 안 되네요. 어떻게 하나요?\n아래 사진처럼 떠요'
    );

    return (
      <TextArea
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    );
  },
};

export const Error: Story = {
  render: function Render() {
    const [value, setValue] = useState('문의 내용');

    return (
      <TextArea
        value={value}
        errorMessage="문의 내용을 10자 이상 입력해 주세요."
        onChange={(event) => setValue(event.target.value)}
      />
    );
  },
};
