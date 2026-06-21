import { useState } from 'react';
import { useNavigate } from 'react-router';
import cn from '@/utils/cn';
import { PageHeader, FilterChip } from '@/shared/components';
import { ArrowBackIcon } from '@/shared/icons';
import { USER_SKIN_TYPE_OPTIONS } from '@somesay/shared';
import { MOCK_ACCOUNT } from '@/features/myPage/components/mockData';

export const SkinTypePage = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>(MOCK_ACCOUNT.skinTypes);

  const isCompleted = selected.length > 0;
  const isChanged =
    JSON.stringify(selected) !== JSON.stringify(MOCK_ACCOUNT.skinTypes);

  const handleSelect = (label: string) => {
    if (label === '모르겠음') {
      setSelected((prev) => (prev.includes('모르겠음') ? [] : ['모르겠음']));
      return;
    }
    setSelected((prev) => {
      const withoutUnknown = prev.filter((s) => s !== '모르겠음');
      return withoutUnknown.includes(label)
        ? withoutUnknown.filter((s) => s !== label)
        : withoutUnknown.length < 2
          ? [...withoutUnknown, label]
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
        <p className="caption1-m text-grey05">최대 2개 선택</p>
        <div className="flex flex-wrap gap-3">
          {USER_SKIN_TYPE_OPTIONS.map((option) => (
            <FilterChip
              key={option.value}
              label={option.label}
              isSelected={selected.includes(option.label)}
              onClick={() => handleSelect(option.label)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
