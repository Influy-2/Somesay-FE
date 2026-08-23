import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';

import mockCreator from '@/assets/mock_creator.png';
import { CreatorRankingCard } from './CreatorRankingCard';

const meta: Meta<typeof CreatorRankingCard> = {
  title: 'Shared/Profile/CreatorRankingCard',
  component: CreatorRankingCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="w-[22.375rem]">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  argTypes: {
    creatorId: { control: 'number' },
    ranking: { control: 'number' },
    rankChange: { control: 'number' },
    rankChangeDiff: { control: 'select', options: ['up', 'down', 'same'] },
    profileImageUrl: { control: 'text' },
    nickname: { control: 'text' },
    youtubeLink: { control: 'text' },
    subscriberNum: { control: 'number' },
    ageGroup: { control: 'text' },
    skinTypes: { control: 'object' },
    trustScore: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof CreatorRankingCard>;

const defaultArgs = {
  creatorId: 1,
  ranking: 1,
  rankChange: 2,
  rankChangeDiff: 'up' as const,
  profileImageUrl: mockCreator,
  nickname: 'RISABAE',
  youtubeLink: 'https://www.youtube.com',
  subscriberNum: 1_300_000,
  ageGroup: '20대',
  skinTypes: ['건성'],
  trustScore: 100,
};

export const RankUp: Story = {
  args: defaultArgs,
};

export const RankDown: Story = {
  args: {
    ...defaultArgs,
    ranking: 2,
    rankChangeDiff: 'down',
  },
};

export const NoRankChange: Story = {
  args: {
    ...defaultArgs,
    ranking: 3,
    rankChange: 0,
    rankChangeDiff: 'same',
  },
};

export const LongContent: Story = {
  args: {
    ...defaultArgs,
    ranking: 30,
    nickname: '아주 긴 이름을 가진 뷰티 크리에이터 채널',
    subscriberNum: 12_345_678,
    skinTypes: ['건성', '민감성', '수부지', '복합성'],
    trustScore: 87.6,
  },
};
