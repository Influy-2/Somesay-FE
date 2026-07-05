import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from '../constants/auth.constants';

const storageValues = new Map<string, string>();
const memoryLocalStorage: Storage = {
  get length() {
    return storageValues.size;
  },
  clear: () => storageValues.clear(),
  getItem: (key) => storageValues.get(key) ?? null,
  key: (index) => [...storageValues.keys()][index] ?? null,
  removeItem: (key) => storageValues.delete(key),
  setItem: (key, value) => storageValues.set(key, value),
};

vi.stubGlobal('localStorage', memoryLocalStorage);

const { clearAuthTokens, getAccessToken, saveAuthTokens } =
  await import('./authToken.service');

describe('auth token storage', () => {
  beforeEach(() => memoryLocalStorage.clear());

  it('access token과 refresh token을 함께 저장한다', () => {
    saveAuthTokens({
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    });

    expect(getAccessToken()).toBe('access-token');
    expect(localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY)).toBe(
      'refresh-token'
    );
  });

  it('인증 토큰을 모두 제거한다', () => {
    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, 'access-token');
    localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, 'refresh-token');

    clearAuthTokens();

    expect(localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)).toBeNull();
    expect(localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY)).toBeNull();
  });
});
