import { useNavigate } from 'react-router';
import {
  PageHeader,
  EvaluatedCreatorItemHorizontal,
} from '@/shared/components';
import { ArrowBackIcon } from '@/shared/icons';
import { getSkinTypeLabels } from '@somesay/shared';
import { MOCK_EVALUATED_CREATORS_LIST } from '@/features/myPage';

/** @spec 5.6.2 */
export const MyReviewEvaluationCreatorListPage = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-13.5 flex flex-col">
      <PageHeader
        title="리뷰 평가한 크리에이터"
        left={
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="뒤로 가기"
          >
            <ArrowBackIcon aria-hidden="true" />
          </button>
        }
      />
      <div className="px-4 py-3">
        <span className="body2-m text-grey06">
          {MOCK_EVALUATED_CREATORS_LIST.length}개
        </span>
      </div>
      <ul className="divide-grey02 divide-y">
        {MOCK_EVALUATED_CREATORS_LIST.map((creator) => (
          <li key={creator.creatorId}>
            <EvaluatedCreatorItemHorizontal
              creatorId={creator.creatorId}
              profileImageUrl={creator.creatorProfileImgUrl}
              name={creator.creatorName}
              age={creator.creatorAge}
              skinType={getSkinTypeLabels(creator.creatorSkinTypeIds).join(
                ', '
              )}
              reviewCount={creator.myReactionCount}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
