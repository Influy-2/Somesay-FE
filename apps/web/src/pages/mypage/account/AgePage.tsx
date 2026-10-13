import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PageHeader, FilterChip } from '@/shared/components';
import { ArrowBackIcon } from '@/shared/icons';
import { AGE_LABELS, type AgeType } from '@somesay/shared';
import { useAuth, usePatchUserBasicInfo } from '@/shared/hooks';

// 선택지는 라벨 테이블에서 파생한다. 값은 서버 enum 그대로 두고 표시만 한글로 한다.
const AGE_OPTIONS = Object.entries(AGE_LABELS) as [AgeType, string][];

export const AgePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { updateBasicInfo, isPending } = usePatchUserBasicInfo();
  const [selected, setSelected] = useState<AgeType | null>(user?.age ?? null);

  const isChanged = selected !== null && selected !== user?.age;
  const canComplete = isChanged && !isPending;

  const handleComplete = () => {
    if (!canComplete || selected === null) return;
    updateBasicInfo({ age: selected }, { onSuccess: () => navigate(-1) });
  };

  return (
    <div className="mt-13.5 flex flex-col">
      <PageHeader
        left={
          <button type="button" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </button>
        }
        title="연령"
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
        {AGE_OPTIONS.map(([value, label]) => (
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
