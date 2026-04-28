import type { Meta, StoryObj } from '@storybook/react-vite';

import mockProfile1 from '@/assets/mock_profile_img.svg';
import mockProfile2 from '@/assets/mock_profile2_img.png';
import mockProfile3 from '@/assets/mock_profile3_img.png';

import { AvatarStack } from './AvatarStack';

const meta: Meta<typeof AvatarStack> = {
  title: 'Shared/ProductCard/AvatarStack',
  component: AvatarStack,
  tags: ['autodocs'],
  argTypes: {
    creators: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof AvatarStack>;

export const Default: Story = {
  args: {
    creators: [
      { name: '크리에이터1', profileImageUrl: mockProfile1 },
      { name: '크리에이터2', profileImageUrl: mockProfile2 },
      { name: '크리에이터3', profileImageUrl: mockProfile3 },
    ],
  },
};
