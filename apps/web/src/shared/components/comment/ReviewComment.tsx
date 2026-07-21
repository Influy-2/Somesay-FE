// comment

import { ChipAgreement, ConsumerReviewProfile } from '@/shared/components';

export interface ReviewCommentProps {
  nickname: string;
  isAgree: boolean;
  content: string;
  profileImg?: string;
  skinTypes?: string[];
  skinExpectations?: string[];
}

export const ReviewComment = ({
  nickname,
  isAgree,
  content,
  profileImg,
  skinTypes,
  skinExpectations,
}: ReviewCommentProps) => {
  return (
    <div className="flex flex-col gap-3.5 py-4">
      <ConsumerReviewProfile
        nickname={nickname}
        {...(profileImg ? { profileImageUrl: profileImg } : {})}
        {...(skinTypes ? { skinTypes } : {})}
        {...(skinExpectations ? { skinExpectations } : {})}
      />
      <div className="m flex flex-col items-start gap-2 pl-8">
        <ChipAgreement type={isAgree ? 'agree' : 'disagree'} />
        <p className="body2-">{content}</p>
      </div>
    </div>
  );
};
