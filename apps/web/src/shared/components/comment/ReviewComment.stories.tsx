import type { Meta, StoryObj } from '@storybook/react-vite';

import { ReviewComment } from './ReviewComment';

const meta: Meta<typeof ReviewComment> = {
  title: 'Shared/Comment/ReviewComment',
  component: ReviewComment,
  tags: ['autodocs'],
  argTypes: {
    nickname: { control: 'text' },
    isAgree: { control: 'boolean' },
    content: { control: 'text' },
    profileImg: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ReviewComment>;

export const Default: Story = {
  args: {
    nickname: 'vi****',
    isAgree: false,
    content:
      '이 리뷰에 정말 공감합니다. 이 제품이 메이크업 전에 쓰기에 진짜 좋아요. 수분 보충도 잘 돼고 베이스 올려도 들뜨지 않더라구요.',
    profileImg: '\n',
  },
};
export const ShortContent: Story = {
  args: {
    nickname: 'vi****',
    isAgree: true,
    content: '굳.',
    profileImg: '\n',
  },
};
