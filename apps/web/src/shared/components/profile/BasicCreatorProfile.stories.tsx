import type { Meta, StoryObj } from '@storybook/react-vite';

import { AGE_TYPES, type BasicCreatorProfileType } from '@somesay/shared';

import { BasicCreatorProfile } from './BasicCreatorProfile';

const meta: Meta<typeof BasicCreatorProfile> = {
  title: 'Shared/Profile/BasicCreatorProfile',
  component: BasicCreatorProfile,
  tags: ['autodocs'],
  argTypes: {
    creatorId: { control: 'number' },
    creatorName: { control: 'text' },
    creatorProfileImgUrl: { control: 'text' },
    creatorSubscriberNum: { control: 'number' },
    trustRank: { control: 'number' },
    highlightedLabels: { control: 'object' },
    creatorAge: { control: 'select', options: AGE_TYPES },
    creatorSkinTypes: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof BasicCreatorProfile>;

export const Default: Story = {
  args: {
    creatorId: 1,
    creatorName: '이름',
    creatorProfileImgUrl: 'https://placehold.co/100',
    creatorSubscriberNum: 0,
    trustRank: 3,
    creatorAge: 'TWENTIES',
    creatorSkinTypes: [{ skinTypeId: 1, skinTypeName: '건성' }],
    highlightedLabels: ['건성'],
  },
};

export const WithoutVisibleTrustRank: Story = {
  args: {
    ...Default.args,
    trustRank: 11,
    highlightedLabels: [],
  },
};

// 서버가 연령을 내려주지 않는 크리에이터가 있어 폴백 문구를 스토리로 남깁니다.
export const WithoutAge: Story = {
  args: {
    ...Default.args,
    // 타입은 non-null 이지만 운영에서 null 이 옵니다.
    creatorAge: null as unknown as BasicCreatorProfileType['creatorAge'],
  },
};
