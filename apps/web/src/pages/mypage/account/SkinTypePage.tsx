import { useState } from 'react';
import { useNavigate } from 'react-router';
import cn from '@/utils/cn';
import { PageHeader, FilterChip } from '@/shared/components';
import { ArrowBackIcon } from '@/shared/icons';
import { SKIN_TYPE_OPTIONS } from '@somesay/shared';
import { MOCK_ACCOUNT } from '@/features/myPage';

// '모르겠음'은 다른 피부 타입과 함께 고를 수 없어 id를 따로 둡니다.
const UNKNOWN_SKIN_TYPE_ID = 8;
const MAX_SELECTIONS = 2;

export const SkinTypePage = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number[]>(MOCK_ACCOUNT.skinTypeIds);

  const isCompleted = selected.length > 0;
  const isChanged =
    JSON.stringify(selected) !== JSON.stringify(MOCK_ACCOUNT.skinTypeIds);

  const handleSelect = (id: number) => {
    if (id === UNKNOWN_SKIN_TYPE_ID) {
      setSelected((prev) =>
        prev.includes(UNKNOWN_SKIN_TYPE_ID) ? [] : [UNKNOWN_SKIN_TYPE_ID]
      );
      return;
    }
    setSelected((prev) => {
      const withoutUnknown = prev.filter((v) => v !== UNKNOWN_SKIN_TYPE_ID);
      return withoutUnknown.includes(id)
        ? withoutUnknown.filter((v) => v !== id)
        : withoutUnknown.length < MAX_SELECTIONS
          ? [...withoutUnknown, id]
          : withoutUnknown;
    });
  };

  const handleComplete = () => {
    if (!isChanged) return;
    // TODO: API 연결 후 피부타입 변경 로직 추가
    navigate(-1);
  };

  return (
    <div className="mt-13.5 flex flex-col">
      <PageHeader
        left={
          <button type="button" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </button>
        }
        title="피부타입"
        right={[
          <button
            key="complete"
            type="button"
            onClick={handleComplete}
            disabled={!isChanged || !isCompleted}
            className={cn(
              'body1-sb',
              isChanged && isCompleted ? 'text-black' : 'text-grey04'
            )}
          >
            완료
          </button>,
        ]}
      />
      <div className="flex flex-col gap-4 px-4 pt-10">
        <p className="caption1-m text-grey05">최대 {MAX_SELECTIONS}개 선택</p>
        <div className="flex flex-wrap gap-3">
          {SKIN_TYPE_OPTIONS.map((option) => (
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
