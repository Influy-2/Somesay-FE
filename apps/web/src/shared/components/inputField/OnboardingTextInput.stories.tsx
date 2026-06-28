import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  OnboardingEmailInput,
  OnboardingNicknameInput,
  OnboardingVerificationCodeInput,
} from './OnboardingTextInput';

const meta: Meta<typeof OnboardingNicknameInput> = {
  title: 'Shared/InputField/OnboardingTextInput',
  component: OnboardingNicknameInput,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[358px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof OnboardingNicknameInput>;

export const NicknameEmpty: Story = {
  render: function Render() {
    const [value, setValue] = useState('');

    return (
      <OnboardingNicknameInput
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    );
  },
};

export const NicknameValid: Story = {
  render: function Render() {
    const [value, setValue] = useState('닉네임123sd');

    return (
      <OnboardingNicknameInput
        value={value}
        helperText="사용 가능한 닉네임입니다."
        onChange={(event) => setValue(event.target.value)}
      />
    );
  },
};

export const NicknameError: Story = {
  render: function Render() {
    const [value, setValue] = useState('닉네임123s_');

    return (
      <OnboardingNicknameInput
        value={value}
        errorMessage="닉네임은 한글, 영어, 숫자만 사용할 수 있습니다."
        onChange={(event) => setValue(event.target.value)}
      />
    );
  },
};

export const VerificationCodeEmpty: Story = {
  render: function Render() {
    const [value, setValue] = useState('');

    return (
      <OnboardingVerificationCodeInput
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    );
  },
};

export const VerificationCodeValid: Story = {
  render: function Render() {
    const [value, setValue] = useState('123456');

    return (
      <OnboardingVerificationCodeInput
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    );
  },
};

export const VerificationCodeError: Story = {
  render: function Render() {
    const [value, setValue] = useState('123456');

    return (
      <OnboardingVerificationCodeInput
        value={value}
        errorMessage="인증번호가 일치하지 않습니다."
        onChange={(event) => setValue(event.target.value)}
      />
    );
  },
};

export const VerificationCodeExpired: Story = {
  render: function Render() {
    const [value, setValue] = useState('');

    return (
      <OnboardingVerificationCodeInput
        value={value}
        timerText="00:00"
        isExpired
        errorMessage="인증 시간이 만료되었습니다."
        onChange={(event) => setValue(event.target.value)}
      />
    );
  },
};

export const EmailEmpty: Story = {
  render: function Render() {
    const [value, setValue] = useState('');

    return (
      <OnboardingEmailInput
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    );
  },
};

export const EmailValid: Story = {
  render: function Render() {
    const [value, setValue] = useState('Somesay@naver.com');

    return (
      <OnboardingEmailInput
        value={value}
        helperText="유효한 이메일 주소입니다."
        onChange={(event) => setValue(event.target.value)}
      />
    );
  },
};

export const EmailError: Story = {
  render: function Render() {
    const [value, setValue] = useState('아아아아아');

    return (
      <OnboardingEmailInput
        value={value}
        errorMessage="유효한 이메일 주소를 입력해 주세요."
        onChange={(event) => setValue(event.target.value)}
      />
    );
  },
};

export const EmailWithSuggestions: Story = {
  render: function Render() {
    const [value, setValue] = useState('Somesay');

    return (
      <OnboardingEmailInput
        value={value}
        suggestions={[
          'Somesay@gmail.com',
          'Somesay@naver.com',
          'Somesay@daum.net',
          'Somesay@nate.com',
        ]}
        onSuggestionSelect={setValue}
        onChange={(event) => setValue(event.target.value)}
      />
    );
  },
};
