import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ONBOARDING_STORAGE_KEY } from '../constants/onboarding.constants';

const storageValues = new Map<string, string>();
const memorySessionStorage: Storage = {
  get length() {
    return storageValues.size;
  },
  clear: () => storageValues.clear(),
  getItem: (key) => storageValues.get(key) ?? null,
  key: (index) => [...storageValues.keys()][index] ?? null,
  removeItem: (key) => storageValues.delete(key),
  setItem: (key, value) => storageValues.set(key, value),
};

vi.stubGlobal('sessionStorage', memorySessionStorage);

const { useOnboardingStore } = await import('./onboarding.store');

describe('onboarding store', () => {
  beforeEach(() => {
    useOnboardingStore.getState().reset();
    memorySessionStorage.clear();
  });

  it('피부 타입과 피부 고민의 세 번째 선택을 막는다', () => {
    const store = useOnboardingStore.getState();

    store.toggleSkinTypeName('건성');
    store.toggleSkinTypeName('지성');
    store.toggleSkinTypeName('복합성');
    store.toggleConcern('보습');
    store.toggleConcern('진정');
    store.toggleConcern('모공');

    expect(useOnboardingStore.getState().skinTypeNames).toEqual([
      '건성',
      '지성',
    ]);
    expect(useOnboardingStore.getState().concerns).toEqual(['보습', '진정']);
  });

  it('이미 선택된 값을 다시 선택하면 해제한다', () => {
    const store = useOnboardingStore.getState();

    store.toggleSkinTypeName('건성');
    store.toggleSkinTypeName('지성');
    store.toggleSkinTypeName('건성');

    expect(useOnboardingStore.getState().skinTypeNames).toEqual(['지성']);
  });

  it('앞 단계 값을 변경하면 해당 단계 이후 완료 상태를 무효화한다', () => {
    const store = useOnboardingStore.getState();

    store.markStepComplete('terms');
    store.markStepComplete('nickname');
    store.markStepComplete('profile');
    store.setNickname('새닉네임');

    expect(useOnboardingStore.getState().completedSteps).toEqual(['terms']);
  });

  it('provider를 다시 선택하면 이전 온보딩 초안을 초기화한다', () => {
    const store = useOnboardingStore.getState();

    store.selectProvider('KAKAO');
    store.setNickname('somesay');
    store.selectProvider('GOOGLE');

    expect(useOnboardingStore.getState()).toMatchObject({
      provider: 'GOOGLE',
      nickname: '',
      completedSteps: [],
    });
  });

  it('sessionStorage에 저장된 초안을 다시 복원한다', async () => {
    const store = useOnboardingStore.getState();

    store.selectProvider('KAKAO');
    store.setNickname('저장된닉네임');

    const persistedDraft = memorySessionStorage.getItem(ONBOARDING_STORAGE_KEY);
    expect(persistedDraft).not.toBeNull();

    store.reset();
    memorySessionStorage.setItem(
      ONBOARDING_STORAGE_KEY,
      persistedDraft as string
    );
    await useOnboardingStore.persist.rehydrate();

    expect(useOnboardingStore.getState()).toMatchObject({
      provider: 'KAKAO',
      nickname: '저장된닉네임',
      hasHydrated: true,
    });
  });
});
