import type { Meta, StoryObj } from '@storybook/react-vite';

import { AGE_TYPES } from '@somesay/shared';

import mockCreator from '@/assets/mock_creator.png';
import { CreatorRankingCard } from './CreatorRankingCard';

const meta: Meta<typeof CreatorRankingCard> = {
  title: 'Shared/Profile/CreatorRankingCard',
  component: CreatorRankingCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[22.375rem]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    creatorId: { control: 'number' },
    creatorRanking: { control: 'number' },
    rankChange: { control: 'number' },
    rankChangeDiff: { control: 'select', options: ['up', 'down', 'same'] },
    creatorProfileImgUrl: { control: 'text' },
    creatorName: { control: 'text' },
    creatorYoutubeLink: { control: 'text' },
    creatorSubscriberNum: { control: 'number' },
    creatorAge: { control: 'select', options: AGE_TYPES },
    creatorSkinTypes: { control: 'object' },
    creatorTrustScore: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof CreatorRankingCard>;

const defaultArgs = {
  creatorId: 1,
  creatorRanking: 1,
  rankChange: 2,
  rankChangeDiff: 'up' as const,
  creatorProfileImgUrl: mockCreator,
  creatorName: 'RISABAE',
  creatorYoutubeLink: 'https://www.youtube.com',
  creatorSubscriberNum: 1_300_000,
  creatorAge: 'TWENTIES' as const,
  creatorSkinTypes: [{ skinTypeId: 1, skinTypeName: '건성' }],
  creatorTrustScore: 100,
};

export const RankUp: Story = {
  args: defaultArgs,
};

export const RankDown: Story = {
  args: {
    ...defaultArgs,
    creatorRanking: 2,
    rankChangeDiff: 'down',
  },
};

export const NoRankChange: Story = {
  args: {
    ...defaultArgs,
    creatorRanking: 3,
    rankChange: 0,
    rankChangeDiff: 'same',
  },
};

export const LongContent: Story = {
  args: {
    ...defaultArgs,
    creatorRanking: 30,
    creatorName: '아주 긴 이름을 가진 뷰티 크리에이터 채널',
    creatorSubscriberNum: 12_345_678,
    creatorSkinTypes: [
      { skinTypeId: 1, skinTypeName: '건성' },
      { skinTypeId: 6, skinTypeName: '민감성' },
      { skinTypeId: 5, skinTypeName: '수부지' },
      { skinTypeId: 3, skinTypeName: '복합성' },
    ],
    creatorTrustScore: 87.6,
  },
};
