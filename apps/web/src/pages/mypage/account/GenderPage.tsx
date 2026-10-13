import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PageHeader, FilterChip } from '@/shared/components';
import { ArrowBackIcon } from '@/shared/icons';
import type { GenderType } from '@somesay/shared';
import { GENDER_LABELS } from '@/features/myPage';
import { useAuth, usePatchUserBasicInfo } from '@/shared/hooks';

// 선택지는 라벨 테이블에서 파생한다. 값은 서버 enum 그대로 두고 표시만 한글로 한다.
const GENDER_OPTIONS = Object.entries(GENDER_LABELS) as [GenderType, string][];

export const GenderPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { updateBasicInfo, isPending } = usePatchUserBasicInfo();
  const [selected, setSelected] = useState<GenderType | null>(
    user?.gender ?? null
  );

  const isChanged = selected !== null && selected !== user?.gender;
  const canComplete = isChanged && !isPending;

  const handleComplete = () => {
    if (!canComplete || selected === null) return;
    updateBasicInfo({ gender: selected }, { onSuccess: () => navigate(-1) });
  };

  return (
    <div className="mt-13.5 flex flex-col">
      <PageHeader
        left={
          <button type="button" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </button>
        }
        title="성별"
        right={[
          <button
            key="complete"
            type="button"
            onClick={handleComplete}
            disabled={!canComplete}
            className={`body1-sb ${canComplete ? 'text-black' : 'text-grey04'}`}
          >
            완료
          </button>,
        ]}
      />
      <div className="flex flex-wrap gap-3 px-4 pt-10">
        {GENDER_OPTIONS.map(([value, label]) => (
          <FilterChip
            key={value}
            label={label}
            isSelected={selected === value}
            onClick={() => setSelected(value)}
          />
        ))}
      </div>
    </div>
  );
};
