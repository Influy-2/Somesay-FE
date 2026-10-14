import { describe, expect, it } from 'vitest';
import {
  getResizedDimensions,
  validateProfileImageFile,
} from './profileImage.utils';

describe('getResizedDimensions', () => {
  it('가로가 긴 이미지를 긴 변 기준으로 줄인다', () => {
    expect(getResizedDimensions(4000, 3000, 512)).toEqual({
      width: 512,
      height: 384,
    });
  });

  it('세로가 긴 이미지를 긴 변 기준으로 줄인다', () => {
    expect(getResizedDimensions(3000, 4000, 512)).toEqual({
      width: 384,
      height: 512,
    });
  });

  it('이미 작은 이미지는 그대로 둔다', () => {
    expect(getResizedDimensions(300, 200, 512)).toEqual({
      width: 300,
      height: 200,
    });
  });

  it('결과 크기는 정수다', () => {
    expect(getResizedDimensions(1000, 333, 512)).toEqual({
      width: 512,
      height: 170,
    });
  });
});

describe('validateProfileImageFile', () => {
  it('이미지 파일은 통과한다', () => {
    const file = new File(['x'], 'a.png', { type: 'image/png' });
    expect(validateProfileImageFile(file)).toBeNull();
  });

  it('이미지가 아닌 파일은 이미지 안내 문구를 돌려준다', () => {
    const file = new File(['x'], 'a.txt', { type: 'text/plain' });
    expect(validateProfileImageFile(file)).toBe(
      '이미지 파일만 올릴 수 있어요.'
    );
  });

  it('20MB를 넘는 파일은 용량 안내 문구를 돌려준다', () => {
    const file = new File(['x'], 'a.png', { type: 'image/png' });
    Object.defineProperty(file, 'size', { value: 20 * 1024 * 1024 + 1 });
    expect(validateProfileImageFile(file)).toBe(
      '20MB 이하의 이미지만 올릴 수 있어요.'
    );
  });
});
