import type { Meta, StoryObj } from '@storybook/react-vite';
import { RecommendedCreatorProfile } from './RecommendedCreatorProfile';

const meta: Meta<typeof RecommendedCreatorProfile> = {
  title: 'Shared/Profile/RecommendedCreatorProfile',
  component: RecommendedCreatorProfile,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RecommendedCreatorProfile>;

export const Default: Story = {
  args: {
    creatorId: 1,
    profileImageUrl: '',
    name: '김크리스탈',
    ageGroup: '20대',
    skinType: '지성',
  },
};
