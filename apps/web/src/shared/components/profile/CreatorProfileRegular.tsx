// Profile/크리에이터/기본형 컴포넌트
import YoutubeIcon from '@/shared/icons/YoutubeIcon.svg?react';
import { ChipHomeProfile } from '@/shared/components/chips/ChipHomeProfile';

const imgProfilePhoto =
  'https://www.figma.com/api/mcp/asset/39939f4d-3d38-45bb-bb23-dfce01aa3736';

export const CreatorProfileRegular = () => {
  //임시
  const trustScore = 90;
  const ageGroup = 20;
  const skinType = '건성';

  return (
    <div
      className="flex w-full items-center gap-2.5"
      aria-label={`${name} 크리에이터 프로필`}
    >
      {/* 프로필 사진 */}
      <div
        className="flex aspect-square h-11 w-11 shrink-0 items-center justify-center rounded-full"
        aria-hidden="true"
      >
        <img
          className="h-full w-full object-cover"
          src={imgProfilePhoto}
          alt={`${name} 프로필 사진`}
        />
      </div>

      {/* info */}
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-0">
        {/* Top row: name + YouTube subscriber */}
        <div className="flex items-center gap-2">
          <span
            className="body1-sb shrink-0 text-black"
            aria-label={`크리에이터 이름: ${name}`}
          >
            김점례
          </span>

          <div
            className="text-grey08 caption2-m flex shrink-0 items-center gap-0.5"
            aria-label={`${name} 유튜브 채널, 구독자  수정`}
          >
            <YoutubeIcon />
            30만
          </div>
        </div>

        {/* Bottom row: trust score + skin/age chips */}
        <div
          className="flex w-full items-center justify-between"
          aria-label={`신뢰도: ${trustScore}`}
        >
          <p className="text-grey07" aria-disabled>
            <span className="caption1-m">신뢰도 </span>
            <strong className="caption1-b">{trustScore}</strong>
          </p>

          <div
            className="flex items-center gap-1 p-0"
            aria-label="크리에이터 특성 태그"
          >
            <ChipHomeProfile label={ageGroup + '대'} />
            <ChipHomeProfile label={skinType} />
          </div>
        </div>
      </div>
    </div>
  );
};
