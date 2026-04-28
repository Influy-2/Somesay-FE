import type { Meta, StoryObj } from '@storybook/react-vite';

import { ResetButton } from './ResetButton';

const meta: Meta<typeof ResetButton> = {
  title: 'Shared/Buttons/ResetButton',
  component: ResetButton,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ResetButton>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          width: 400,
          height: 400,
          border: '1px dashed #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    onClick: () => {},
  },
};
