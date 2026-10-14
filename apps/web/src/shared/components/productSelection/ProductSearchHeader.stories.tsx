import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProductSearchHeader } from './ProductSearchHeader';

const meta: Meta<typeof ProductSearchHeader> = {
  title: 'Shared/ProductSelection/ProductSearchHeader',
  component: ProductSearchHeader,
  tags: ['autodocs'],
  args: {
    value: '토너 패드',
    backLabel: '뒤로 가기',
    onChange: () => {},
    onSubmit: () => {},
    onClear: () => {},
    onBack: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof ProductSearchHeader>;

// 입력 모드 헤더는 fixed라서 높이 있는 래퍼로 화면을 확보합니다.
export const Input: Story = {
  args: { mode: 'input' },
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="h-40">
        <Story />
      </div>
    ),
  ],
};

export const Result: Story = { args: { mode: 'result' } };

export const ResultWithTitleAndRight: Story = {
  args: {
    mode: 'result',
    title: '제품 추가',
    right: [
      <button key="add" type="button" className="body2-m text-black">
        추가
      </button>,
    ],
  },
};
