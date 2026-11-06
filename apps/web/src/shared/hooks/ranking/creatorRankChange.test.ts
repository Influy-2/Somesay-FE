import { describe, expect, it } from 'vitest';
import type { CreatorRankingResponse } from '@somesay/shared';

import { withRankChange } from './creatorRankChange';

const createCreator = (
  creatorRanking: number,
  creatorOldRanking: number
): CreatorRankingResponse => ({
  creatorId: 1,
  creatorName: '크리에이터',
  creatorProfileImgUrl: '',
  creatorAge: 'TWENTIES',
  creatorSkinTypeIds: [1],
  creatorSubscriberNum: 1000,
  creatorRanking,
  creatorOldRanking,
  creatorTrustScore: 90,
  creatorYoutubeLink: '',
});

describe('withRankChange', () => {
  it('순위 숫자가 작아지면 상승으로 계산한다', () => {
    expect(withRankChange(createCreator(2, 5))).toMatchObject({
      rankChange: 3,
      rankChangeDiff: 'up',
    });
  });

  it('순위 숫자가 커지면 하락으로 계산한다', () => {
    expect(withRankChange(createCreator(4, 1))).toMatchObject({
      rankChange: 3,
      rankChangeDiff: 'down',
    });
  });

  it('순위가 같으면 변동 없음이다', () => {
    expect(withRankChange(createCreator(3, 3))).toMatchObject({
      rankChange: 0,
      rankChangeDiff: 'same',
    });
  });

  it('지난 순위가 null 이면(신규 진입) 변동 없음으로 둔다', () => {
    const creator = {
      ...createCreator(3, 0),
      creatorOldRanking: null,
    } as unknown as CreatorRankingResponse;

    expect(withRankChange(creator)).toMatchObject({
      rankChange: 0,
      rankChangeDiff: 'same',
    });
  });

  it('응답 필드는 이름 그대로 유지한다', () => {
    const creator = createCreator(1, 1);

    expect(withRankChange(creator)).toMatchObject(creator);
  });
});
