import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Shared/Tooltip/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'withClose'],
    },
    arrowPosition: {
      control: 'radio',
      options: ['top', 'bottom'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    label: '크리에이터 이름',
    isVisible: true,
    variant: 'default',
  },
};

export const WithClose: Story = {
  args: {
    label: '프로필을 누르면 크리에이터의\n이름을 확인할 수 있어요.',
    isVisible: true,
    variant: 'withClose',
    onClose: () => {},
  },
};
