import type { Meta, StoryObj } from '@storybook/react-vite';

import { CreatorRankingUpDownRow } from './CreatorRankingUpDownRow';

const meta: Meta<typeof CreatorRankingUpDownRow> = {
  title: 'Shared/Profile/CreatorRankingUpDownRow',
  component: CreatorRankingUpDownRow,
  tags: ['autodocs'],
  argTypes: {
    rankChange: { control: 'select', options: ['up', 'down', 'same'] },
    rankChangeDiff: { control: 'number' },
    creatorId: { control: 'number' },
    nickname: { control: 'text' },
    profileImageUrl: { control: 'text' },
    subscriberCount: { control: 'number' },
    trustScore: { control: 'number' },
    ageGroup: { control: 'number' },
    skinType: { control: 'text' },
    ranking: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof CreatorRankingUpDownRow>;

export const Default: Story = {
  args: {
    rankChange: 'down',
    rankChangeDiff: 1,
    creatorId: 1,
    nickname: '이름',
    profileImageUrl: 'https://placehold.co/100',
    subscriberCount: 2,
    trustScore: 90,
    ageGroup: 20,
    skinType: '텍스트',
    ranking: 2,
  },
};
