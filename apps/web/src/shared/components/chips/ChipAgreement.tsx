//Chip/공감반대

import { AgreeIcon, DisagreeIcon } from '@/shared/icons';

interface ChipAgreementProps {
  type: 'agree' | 'disagree';
}

export const ChipAgreement = ({ type }: ChipAgreementProps) => {
  const isAgree = type === 'agree';

  return (
    <div className="border-grey03 bg-grey01 text-grey07 inline-flex items-center justify-center gap-1 rounded-none border px-2 py-1">
      {isAgree ? (
        <AgreeIcon className="size-3 [&_path]:fill-current" />
      ) : (
        <DisagreeIcon className="size-3 [&_path]:fill-current" />
      )}
      <span className="caption1-m text-grey08">
        {isAgree ? '공감해요' : '반대해요'}
      </span>
    </div>
  );
};
