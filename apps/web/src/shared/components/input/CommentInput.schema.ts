import { z } from 'zod';

import { FORBIDDEN_WORDS } from '@somesay/shared';
export const createCommentSchema = (minLength: number) =>
  z
    .string()
    .min(minLength, `${minLength}자 이상 입력해주세요.`)
    .refine(
      (v) => !/((https?:\/\/|www\.)[^\s]+)/i.test(v),
      '링크 삽입은 불가합니다.'
    )
    .refine(
      (v) => !FORBIDDEN_WORDS.some((word) => v.includes(word)),
      '금칙어가 포함되어 있습니다.'
    );
