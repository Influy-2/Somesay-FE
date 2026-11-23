import type { Meta, StoryObj } from '@storybook/react-vite';

import { AGE_TYPES } from '@somesay/shared';

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
    creatorProfileImgUrl: { control: 'text' },
    creatorSubscriberNum: { control: 'number' },
    creatorTrustScore: { control: 'number' },
    creatorAge: { control: 'select', options: AGE_TYPES },
    creatorSkinTypes: { control: 'object' },
    creatorRanking: { control: 'number' },
    creatorYoutubeLink: { control: 'text' },
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
    creatorProfileImgUrl: 'https://placehold.co/100',
    creatorYoutubeLink: 'https://youtube.com',
    creatorSubscriberNum: 2,
    creatorTrustScore: 90,
    creatorAge: 'TWENTIES',
    creatorSkinTypes: [
      { skinTypeId: 1, skinTypeName: '건성' },
      { skinTypeId: 6, skinTypeName: '민감성' },
    ],
    creatorRanking: 2,
  },
};

// 내 조건(20대·건성)과 일치하는 칩만 강조된 상태.
// 연령은 enum으로, 피부 타입은 id로 비교합니다.
export const MyConditionHighlighted: Story = {
  args: {
    ...Default.args,
    isMyAge: (age) => age === 'TWENTIES',
    isMySkinTypeId: (id) => id === 1,
  },
};
