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
    creatorName: { control: 'text' },
    profileImgUrl: { control: 'text' },
    subscriberNum: { control: 'number' },
    trustScore: { control: 'number' },
    ageGroup: { control: 'text' },
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
    creatorName: '이름',
    profileImgUrl: 'https://placehold.co/100',
    youtubeLink: 'https://youtube.com',
    subscriberNum: 2,
    trustScore: 90,
    ageGroup: '20대',
    skinTypes: ['건성', '민감성'],
    ranking: 2,
  },
};

// 내 조건(20대·건성)과 일치하는 칩만 강조된 상태
export const MyConditionHighlighted: Story = {
  args: {
    ...Default.args,
    isMyCondition: (label) => ['20대', '건성'].includes(label),
  },
};
