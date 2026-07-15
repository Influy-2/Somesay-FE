import { useNavigate } from 'react-router';
import {
  PageHeader,
  EvaluatedCreatorItemHorizontal,
} from '@/shared/components';
import { ArrowBackIcon } from '@/shared/icons';
import { MOCK_EVALUATED_CREATORS_LIST } from '@/features/myPage/components/mockData';

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
              profileImageUrl={creator.profileImageUrl}
              name={creator.name}
              ageGroup={creator.ageGroup}
              skinType={creator.skinType}
              reviewCount={creator.reviewCount}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
