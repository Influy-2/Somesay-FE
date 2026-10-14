import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProductSearchTrigger } from './ProductSearchTrigger';

const meta: Meta<typeof ProductSearchTrigger> = {
  title: 'Shared/ProductSelection/ProductSearchTrigger',
  component: ProductSearchTrigger,
  tags: ['autodocs'],
  args: { onClick: () => {} },
};

export default meta;
type Story = StoryObj<typeof ProductSearchTrigger>;

export const Default: Story = {};
