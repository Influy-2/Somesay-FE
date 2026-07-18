//Button/님리뷰에 공감/반대했어요

import { AgreeIcon, DisagreeIcon } from '@/shared/icons';
import { useState } from 'react';
import { Tooltip } from '@/shared/components';

interface ReviewVoteStatusButtonProps {
  type: 'agree' | 'disagree';
  profileImageUrl?: string;
  creatorName?: string;
}

export const ReviewVoteStatusButton = ({
  type,
  profileImageUrl,
  creatorName,
}: ReviewVoteStatusButtonProps) => {
  const isAgree = type === 'agree';
  const [showTooltip, setShowTooltip] = useState(false);

  const handleProfileClick = () => {
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 4000);
  };

  return (
    <div className="bg-grey08 flex flex-1 items-center justify-center self-stretch px-2.5 py-3">
      <div className="relative mr-2 flex items-center">
        <button
          type="button"
          onClick={handleProfileClick}
          className={`bg-grey06 size-5 shrink-0 overflow-hidden rounded-full ${
            showTooltip
              ? 'outline-grey01 outline outline-[1.2px] outline-offset-1'
              : ''
          }`}
        >
          {profileImageUrl && (
            <img
              src={profileImageUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          )}
        </button>
        {creatorName && (
          <Tooltip
            label={creatorName}
            isVisible={showTooltip}
            className="top-7 left-1/2 -translate-x-1/2"
            arrowClassName="left-1/2 -translate-x-1/2"
          />
        )}
      </div>
      <span className="body2-m mr-1 text-white">
        님 리뷰에 {isAgree ? '공감했어요' : '반대했어요'}
      </span>
      {isAgree ? (
        <AgreeIcon className="text-white" />
      ) : (
        <DisagreeIcon className="text-white" />
      )}
    </div>
  );
};
