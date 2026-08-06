import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { HeartButton } from './HeartButton';

const meta: Meta<typeof HeartButton> = {
  title: 'Shared/Buttons/HeartButton',
  component: HeartButton,
  tags: ['autodocs'],
  argTypes: {
    isHearted: { control: 'boolean' },
    productName: { control: 'text' },
    onColor: { control: 'inline-radio', options: ['white', 'black'] },
    offColor: { control: 'inline-radio', options: ['white', 'black'] },
  },
};

export default meta;
type Story = StoryObj<typeof HeartButton>;

const HeartButtonWithState = (
  args: React.ComponentProps<typeof HeartButton>
) => {
  const [isHearted, setIsHearted] = useState(args.isHearted);

  return (
    <HeartButton
      {...args}
      isHearted={isHearted}
      onHeartToggle={() => setIsHearted((prev) => !prev)}
    />
  );
};

// 이미지 위에 올리는 기본 흰색 하트입니다.
export const Default: Story = {
  args: {
    productName: '샘플 상품',
    isHearted: false,
  },
  decorators: [
    (Story) => (
      <div className="bg-grey06 inline-flex p-4">
        <Story />
      </div>
    ),
  ],
  render: (args) => <HeartButtonWithState {...args} />,
};

export const Hearted: Story = {
  ...Default,
  args: {
    productName: '샘플 상품',
    isHearted: true,
  },
};

// 밝은 배경에서 사용하는 검정 하트입니다.
export const Black: Story = {
  args: {
    productName: '샘플 상품',
    isHearted: false,
    onColor: 'black',
    offColor: 'black',
  },
  render: (args) => <HeartButtonWithState {...args} />,
};
