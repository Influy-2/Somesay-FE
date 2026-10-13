import { describe, expect, it } from 'vitest';
import { nicknameSchema } from './nickname.schema';

const LENGTH_MESSAGE = '닉네임은 최소 3자, 최대 12자까지 입력할 수 있습니다.';
const CHARACTER_MESSAGE = '닉네임은 한글, 영문, 숫자만 사용할 수 있습니다.';
const JAMO_MESSAGE = '한글은 자음·모음만으로 입력할 수 없습니다.';

const firstMessage = (value: string) =>
  nicknameSchema.safeParse(value).error?.issues[0]?.message;

describe('nicknameSchema', () => {
  it('앞뒤 공백을 제거한 닉네임을 반환한다', () => {
    expect(nicknameSchema.parse(' 썸세이12 ')).toBe('썸세이12');
  });

  it('영문 대문자와 소문자를 모두 허용한다', () => {
    expect(nicknameSchema.safeParse('Nickname').success).toBe(true);
    expect(nicknameSchema.safeParse('nickname').success).toBe(true);
  });

  it('3자 미만이거나 12자를 넘으면 길이를 안내한다', () => {
    expect(firstMessage('ab')).toBe(LENGTH_MESSAGE);
    expect(firstMessage('1234567890123')).toBe(LENGTH_MESSAGE);
  });

  it('한글·영문·숫자가 아닌 문자가 있으면 허용 문자를 안내한다', () => {
    expect(firstMessage('nickname!')).toBe(CHARACTER_MESSAGE);
    expect(firstMessage('닉 네임')).toBe(CHARACTER_MESSAGE);
  });

  it('조합이 끝나지 않은 한글 자모는 저장할 수 없다', () => {
    expect(firstMessage('ㅋㅋㅋ')).toBe(JAMO_MESSAGE);
    expect(firstMessage('썸세ㅇ')).toBe(JAMO_MESSAGE);
  });

  it('길이가 모자란 자모 입력에는 길이를 먼저 안내한다', () => {
    expect(firstMessage('ㅅ')).toBe(LENGTH_MESSAGE);
  });
});
