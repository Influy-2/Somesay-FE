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

  it('제품은 최대 15개까지 선택하고 해제 후 다시 추가할 수 있다', () => {
    const store = useOnboardingStore.getState();

    Array.from({ length: 16 }, (_, index) => index + 1).forEach((productId) =>
      store.toggleProduct('MATCHED', productId)
    );

    expect(useOnboardingStore.getState().matchedProductIds).toHaveLength(15);
    expect(useOnboardingStore.getState().matchedProductIds).not.toContain(16);

    store.toggleProduct('MATCHED', 1);
    store.toggleProduct('MATCHED', 16);

    expect(useOnboardingStore.getState().matchedProductIds).toHaveLength(15);
    expect(useOnboardingStore.getState().matchedProductIds).toContain(16);
  });

  it('잘 맞는 제품과 안 맞는 제품의 선택 제한은 서로 독립적이다', () => {
    const store = useOnboardingStore.getState();

    Array.from({ length: 15 }, (_, index) => index + 1).forEach((productId) => {
      store.toggleProduct('MATCHED', productId);
      store.toggleProduct('MISMATCHED', productId);
    });

    expect(useOnboardingStore.getState().matchedProductIds).toHaveLength(15);
    expect(useOnboardingStore.getState().mismatchedProductIds).toHaveLength(15);
  });

  it('모르겠음은 다른 피부 타입과 함께 선택할 수 없다', () => {
    const store = useOnboardingStore.getState();

    store.toggleSkinTypeName('건성');
    store.toggleSkinTypeName('모르겠음');
    expect(useOnboardingStore.getState().skinTypeNames).toEqual(['모르겠음']);

    store.toggleSkinTypeName('지성');
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

  it('여러 약관 상태를 한 번에 저장한다', () => {
    const store = useOnboardingStore.getState();

    store.setAgreements({
      TERMS_OF_SERVICE: true,
      PRIVACY_POLICY: true,
    });

    expect(useOnboardingStore.getState().agreements).toEqual({
      TERMS_OF_SERVICE: true,
      PRIVACY_POLICY: true,
    });
  });

  it('새 온보딩을 시작하면 이전 온보딩 초안을 초기화한다', () => {
    const store = useOnboardingStore.getState();

    store.startOnboarding('KAKAO');
    store.setNickname('somesay');
    store.startOnboarding('GOOGLE');

    expect(useOnboardingStore.getState()).toMatchObject({
      provider: 'GOOGLE',
      nickname: '',
      completedSteps: [],
    });
  });

  it('sessionStorage에 저장된 초안을 다시 복원한다', async () => {
    const store = useOnboardingStore.getState();

    store.startOnboarding('KAKAO');
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
