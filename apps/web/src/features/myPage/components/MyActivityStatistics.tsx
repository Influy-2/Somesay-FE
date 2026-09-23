// /my-page 상단 공감한 리뷰, 반대한 리뷰, 코멘트, 평가한 상품, 평가한 크리에이터 박스
import { Link } from 'react-router';

import { PATH } from '@/routes/path';
import { MainArrowIcon } from '@/shared/icons';

import type { UserMyPageStatisticsType } from '@somesay/shared';

type MyActivityStatisticsProps = UserMyPageStatisticsType;

const REVIEW_EVALUATION_PATH = `${PATH.MY_PAGE.BASE}/${PATH.MY_PAGE.REVIEW_EVALUATION.BASE}`;

export const MyActivityStatistics = ({
  reviewTotalCount,
  reviewCreatorCount,
  agreeReviewCount,
  disagreeReviewCount,
  commentCount,
}: MyActivityStatisticsProps) => {
  return (
    <div className="grid grid-cols-2 grid-rows-[auto_auto] gap-2">
      {/* 1행: 공감한 리뷰 / 반대한 리뷰 / 코멘트 - col-span-2 */}
      <dl className="bg-grey01 col-span-2 flex py-4">
        <div className="flex flex-1 flex-col items-center gap-1">
          <dt className="body2-m text-grey08">공감한 리뷰</dt>
          <dd className="subhead-m">{agreeReviewCount}</dd>
        </div>
        <div className="bg-grey03 w-px" aria-hidden="true" />
        <div className="flex flex-1 flex-col items-center gap-1">
          <dt className="body2-m text-grey08">반대한 리뷰</dt>
          <dd className="subhead-m">{disagreeReviewCount}</dd>
        </div>
        <div className="bg-grey03 w-px" aria-hidden="true" />
        <div className="flex flex-1 flex-col items-center gap-1">
          <dt className="body2-m text-grey08">코멘트</dt>
          <dd className="subhead-m">{commentCount}</dd>
        </div>
      </dl>

      {/* 2행 왼쪽: 평가한 상품 */}
      <dl className="bg-grey01 flex flex-col gap-3 p-5">
        <dt className="body2-m text-grey08">평가한 상품</dt>
        <div className="flex items-center justify-between">
          <dd className="headline2 font-normal!">{reviewTotalCount}</dd>
          <Link
            to={REVIEW_EVALUATION_PATH}
            state={{ activeTab: 'products' }}
            aria-label="평가한 상품 목록으로 이동"
          >
            <MainArrowIcon className="text-grey08" />
          </Link>
        </div>
      </dl>

      {/* 2행 오른쪽: 평가한 크리에이터 */}
      <dl className="bg-grey01 flex flex-col gap-3 p-5">
        <dt className="body2-m text-grey08">평가한 크리에이터</dt>
        <div className="flex items-center justify-between">
          <dd className="headline2 font-normal!">{reviewCreatorCount}</dd>
          <Link
            to={REVIEW_EVALUATION_PATH}
            state={{ activeTab: 'creators' }}
            aria-label="평가한 크리에이터 목록으로 이동"
          >
            <MainArrowIcon className="text-grey08" />
          </Link>
        </div>
      </dl>
    </div>
  );
};
