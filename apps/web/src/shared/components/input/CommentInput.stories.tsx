import type { Meta, StoryObj } from '@storybook/react-vite';

import mockProfile from '@/assets/mock_profile_img.svg';

import { CommentInput } from './CommentInput';

const meta: Meta<typeof CommentInput> = {
  title: 'Shared/Input/CommentInput',
  component: CommentInput,
  tags: ['autodocs'],
  argTypes: {
    profileImageSrc: { control: 'text' },
    minLength: { control: 'number' },
    maxLength: { control: 'number' },
    placeholder: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CommentInput>;

export const Default: Story = {
  args: {
    profileImageSrc: mockProfile,
    minLength: 20,
    maxLength: 200,
    placeholder: '이 리뷰에 대한 의견을 남겨주세요',
    onSubmit: () => {},
  },
};

export const WithoutProfile: Story = {
  args: {
    minLength: 20,
    maxLength: 200,
    onSubmit: () => {},
  },
};

export const WithForbiddenWords: Story = {
  args: {
    profileImageSrc: mockProfile,
    minLength: 20,
    maxLength: 200,
    placeholder: '이 리뷰에 대한 의견을 남겨주세요',
    onSubmit: () => {},
  },
};

export const ShortMinLength: Story = {
  args: {
    profileImageSrc: mockProfile,
    minLength: 5,
    maxLength: 200,
    onSubmit: () => {},
  },
};

export const CustomPlaceholder: Story = {
  args: {
    profileImageSrc: mockProfile,
    minLength: 20,
    maxLength: 200,
    placeholder: '20자 이상 200자 이하로 작성해주세요',
    onSubmit: () => {},
  },
};
