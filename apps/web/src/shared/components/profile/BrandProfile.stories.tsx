import type { Meta, StoryObj } from '@storybook/react-vite';

import { BrandProfile } from './BrandProfile';

const meta: Meta<typeof BrandProfile> = {
  title: 'Shared/Profile/BrandProfile',
  component: BrandProfile,
  tags: ['autodocs'],
  argTypes: {
    brandName: { control: 'text' },
    brandImageUrl: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof BrandProfile>;

export const Default: Story = {
  args: {
    brandName: '브랜드명',
  },
};
