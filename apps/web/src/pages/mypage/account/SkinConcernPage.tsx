import { useState } from 'react';
import cn from '@/utils/cn';
import { useNavigate } from 'react-router';
import { PageHeader, FilterChip } from '@/shared/components';
import { ArrowBackIcon } from '@/shared/icons';
import { USER_SKIN_CONCERN_OPTIONS } from '@somesay/shared';
import { MOCK_ACCOUNT } from '@/features/myPage/components/mockData';

export const SkinConcernPage = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>(MOCK_ACCOUNT.skinConcerns);

  const isChanged =
    JSON.stringify(selected) !== JSON.stringify(MOCK_ACCOUNT.skinConcerns);

  const handleSelect = (label: string) => {
    setSelected((prev) =>
      prev.includes(label)
        ? prev.filter((s) => s !== label)
        : prev.length < 2
          ? [...prev, label]
          : prev
    );
  };

  const handleComplete = () => {
    if (!isChanged) return;
    // TODO: API 연결 후 피부고민 변경 로직 추가
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
        title="피부고민"
        right={[
          <button
            key="complete"
            type="button"
            onClick={handleComplete}
            disabled={!isChanged}
            className={cn('body1-sb', isChanged ? 'text-black' : 'text-grey04')}
          >
            완료
          </button>,
        ]}
      />
      <div className="flex flex-col gap-4 px-4 pt-10">
        <p className="caption1-m text-grey05">최대 2개 선택</p>
        <div className="flex flex-wrap gap-3">
          {USER_SKIN_CONCERN_OPTIONS.map((option) => (
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
