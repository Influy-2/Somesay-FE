import type { Meta, StoryObj } from '@storybook/react-vite';

import { CTAButton } from './CTAButton';

const meta: Meta<typeof CTAButton> = {
  title: 'Shared/Buttons/CTAButton',
  component: CTAButton,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof CTAButton>;

export const Default: Story = {
  args: {
    label: '샘플 텍스트',
    onClick: () => {},
  },
};
