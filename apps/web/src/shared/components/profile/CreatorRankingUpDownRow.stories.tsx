import type { Meta, StoryObj } from '@storybook/react-vite';

import { CreatorRankingUpDownRow } from './CreatorRankingUpDownRow';

const meta: Meta<typeof CreatorRankingUpDownRow> = {
  title: 'Shared/Profile/CreatorRankingUpDownRow',
  component: CreatorRankingUpDownRow,
  tags: ['autodocs'],
  argTypes: {
    rankChange: { control: 'number' },
    rankChangeDiff: { control: 'select', options: ['up', 'down', 'same'] },
    creatorId: { control: 'number' },
    nickname: { control: 'text' },
    profileImageUrl: { control: 'text' },
    subscriberNum: { control: 'number' },
    trustScore: { control: 'number' },
    ageGroup: { control: 'number' },
    skinTypes: { control: 'object' },
    ranking: { control: 'number' },
    youtubeLink: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CreatorRankingUpDownRow>;

export const Default: Story = {
  args: {
    rankChange: 1,
    rankChangeDiff: 'down',
    creatorId: 1,
    nickname: '이름',
    profileImageUrl: 'https://placehold.co/100',
    youtubeLink: 'https://youtube.com',
    subscriberNum: 2,
    trustScore: 90,
    ageGroup: 20,
    skinTypes: ['텍스트'],
    ranking: 2,
  },
};
