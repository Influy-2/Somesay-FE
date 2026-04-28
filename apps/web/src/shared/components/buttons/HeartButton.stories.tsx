import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { WhiteHeartButton } from './HeartButton';

const meta: Meta<typeof WhiteHeartButton> = {
  title: 'Shared/Buttons/HeartButton',
  component: WhiteHeartButton,
  tags: ['autodocs'],
  argTypes: {
    isHearted: { control: 'boolean' },
    productName: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof WhiteHeartButton>;

const HeartButtonWithState = (
  args: React.ComponentProps<typeof WhiteHeartButton>
) => {
  const [isHearted, setIsHearted] = useState(false);
  return (
    <WhiteHeartButton
      {...args}
      isHearted={isHearted}
      onHeartToggle={() => setIsHearted((prev) => !prev)}
    />
  );
};

export const Default: Story = {
  args: {
    productName: '샘플 상품',
  },
  render: (args) => <HeartButtonWithState {...args} />,
};
