import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChipAgreement } from './ChipAgreement';

const meta: Meta<typeof ChipAgreement> = {
  title: 'Shared/Chips/ChipAgreement',
  component: ChipAgreement,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['agree', 'disagree'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChipAgreement>;

export const Agree: Story = {
  args: {
    type: 'agree',
  },
};

export const Disagree: Story = {
  args: {
    type: 'disagree',
  },
};
