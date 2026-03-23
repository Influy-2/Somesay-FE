import { useState } from 'react';
import { Link } from 'react-router';
import QuestionIcon from '@/shared/icons/QuestionIcon.svg?react';
import MainArrowIcon from '@/shared/icons/MainArrowIcon.svg?react';

interface CreatorHomeTrustScoreProps {
  trustScore: number;
  trustRank: number;
  totalReviews: number;
  highEmpathyReviews: number;
  myEmpathyReviews: number;
  myOpposedReviews: number;
  highEmpathyRatio: number;
  isLoggedIn?: boolean;
}

export const CreatorHomeTrustScore = ({
  trustScore,
  trustRank,
  totalReviews,
  highEmpathyReviews,
  myEmpathyReviews,
  myOpposedReviews,
  isLoggedIn = false,
}: CreatorHomeTrustScoreProps) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const progressPercent = Math.min(
    (highEmpathyReviews / totalReviews) * 100,
    100
  );

  return (
    <div
      className="grid grid-cols-2 grid-rows-3 gap-1"
      style={{ gridTemplateRows: '109px 91px 91px' }}
    >
      {/* 1행: 신뢰도 + 공감률 - col-span-2 */}
      <div className="bg-grey02 col-span-2 row-span-1 flex items-center justify-between px-5 py-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <span className="body2-m">신뢰도</span>
            {trustRank <= 30 && <span className="body2-sb">{trustRank}위</span>}
            <div className="relative flex items-center">
              <button
                type="button"
                onClick={() => setIsTooltipVisible((prev) => !prev)}
                aria-label="도움말"
              >
                <QuestionIcon />
              </button>
              {/*TODO: 툴팁 디자인 수정*/}
              {isTooltipVisible && (
                <div className="body2-m absolute top-6 -left-12 z-10 w-max bg-black px-2.5 py-2.25 text-white">
                  신뢰도 점수는 크리에이터의 리뷰에 대한
                  <br />
                  섬세 이용자들의 공감, 반대 등을 종합해서 만든 지표예요.
                </div>
              )}
            </div>
          </div>
          <div className="flex items-end gap-0.5">
            <span className="font-pretendard text-[2rem] leading-[124%] font-normal text-[#17171B]">
              {trustScore}
            </span>
            <span className="body2-m text-grey08">점</span>
          </div>
        </div>

        <div className="mb-1 flex w-56.75 flex-col gap-1 self-end">
          {/* 텍스트 - 오른쪽 정렬 */}
          <div
            className="flex items-center justify-end gap-1"
            style={{ height: '17px' }}
          >
            <span className="caption1-m">공감률 90% 이상 리뷰</span>
            <div className="caption1-m">
              <span className="text-black">{highEmpathyReviews}</span>
              <span className="text-grey05">/{totalReviews}개</span>
            </div>
          </div>

          {/* 바 그래프 */}
          <div className="bg-grey03 h-1.5 w-full overflow-hidden">
            <div
              className="h-full transition-all"
              style={{
                width: `${progressPercent}%`,
                backgroundColor: '#161616',
              }}
            />
          </div>
        </div>
      </div>

      {/* 2행&3행 왼쪽: 전체 리뷰 - row-span-2 */}
      <div className="bg-grey02 col-span-1 row-span-2 flex flex-col items-start justify-end px-5 py-5">
        <span className="body2-m">전체 리뷰</span>
        <span className="font-pretendard text-[2rem] leading-[124%] font-normal text-[#17171B]">
          {totalReviews}
        </span>
      </div>

      {/* 2행&3행 오른쪽: 로그인 여부에 따라 분기 */}
      {isLoggedIn ? (
        <>
          {/* 2행 오른쪽: 내가 공감한 리뷰 */}
          <div className="bg-grey02 col-span-1 row-span-1 flex items-center justify-between px-5 py-4">
            <div className="flex w-full flex-col gap-1">
              <span className="body2-m">내가 공감한 리뷰</span>
              <div className="flex items-center justify-between">
                <span className="headline2 font-normal!">
                  {myEmpathyReviews}
                </span>{' '}
                <Link to="/">
                  <MainArrowIcon />
                </Link>
              </div>
            </div>
          </div>

          {/* 3행 오른쪽: 내가 반대한 리뷰 */}
          <div className="bg-grey02 col-span-1 row-span-1 flex items-center justify-between px-5 py-4">
            <div className="flex w-full flex-col gap-1">
              <span className="body2-m">내가 반대한 리뷰</span>
              <div className="flex items-center justify-between">
                <span className="headline2 font-normal!">
                  {myOpposedReviews}
                </span>{' '}
                <Link to="/">
                  <MainArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* 비로그인: 2행&3행 오른쪽 합쳐서 블라인드 */
        <div className="bg-grey02 relative col-span-1 row-span-2 flex flex-col justify-between px-5 py-5">
          <Link to="/" className="self-end">
            <MainArrowIcon />
          </Link>
          <span className="body2-m text-grey05">
            로그인하면 내 활동이
            <br />
            신뢰도에 반영돼요
          </span>
        </div>
      )}
    </div>
  );
};
