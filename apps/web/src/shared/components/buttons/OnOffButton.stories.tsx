import type { Meta, StoryObj } from '@storybook/react-vite';

import { OnOffButton } from './OnOffButton';

const meta: Meta<typeof OnOffButton> = {
  title: 'Shared/Buttons/OnOffButton',
  component: OnOffButton,
  tags: ['autodocs'],
  argTypes: {
    isOn: { control: 'boolean' },
    ariaLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof OnOffButton>;

export const Default: Story = {
  args: {
    isOn: false,
    onToggle: () => {},
  },
};
