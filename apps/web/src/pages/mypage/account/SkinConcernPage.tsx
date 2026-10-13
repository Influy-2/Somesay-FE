import { useState } from 'react';
import cn from '@/utils/cn';
import { useNavigate } from 'react-router';
import { PageHeader, FilterChip } from '@/shared/components';
import { ArrowBackIcon } from '@/shared/icons';
import { USER_SKIN_CONCERN_OPTIONS } from '@somesay/shared';
import { useAuth, usePatchUserSkinInfo } from '@/shared/hooks';

const MAX_SELECTIONS = 2;

export const SkinConcernPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { updateSkinInfo, isPending } = usePatchUserSkinInfo();
  const currentSkinExpectationIds = user?.skinExpectationIds ?? [];
  const [selected, setSelected] = useState<number[]>(currentSkinExpectationIds);

  const isChanged =
    JSON.stringify(selected) !== JSON.stringify(currentSkinExpectationIds);
  const canComplete = isChanged && !isPending;

  const handleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((v) => v !== id)
        : prev.length < MAX_SELECTIONS
          ? [...prev, id]
          : prev
    );
  };

  const handleComplete = () => {
    if (!canComplete) return;
    updateSkinInfo(
      { skinExpectationIds: selected },
      { onSuccess: () => navigate(-1) }
    );
  };

  return (
    <div className="mt-13.5 flex flex-col">
      <PageHeader
        left={
          <button type="button" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </button>
        }
        title="피부고민"
        right={[
          <button
            key="complete"
            type="button"
            onClick={handleComplete}
            disabled={!canComplete}
            className={cn(
              'body1-sb',
              canComplete ? 'text-black' : 'text-grey04'
            )}
          >
            완료
          </button>,
        ]}
      />
      <div className="flex flex-col gap-4 px-4 pt-10">
        <p className="caption1-m text-grey05">최대 {MAX_SELECTIONS}개 선택</p>
        <div className="flex flex-wrap gap-3">
          {USER_SKIN_CONCERN_OPTIONS.map((option) => (
            <FilterChip
              key={option.value}
              label={option.label}
              isSelected={selected.includes(option.value)}
              onClick={() => handleSelect(option.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
