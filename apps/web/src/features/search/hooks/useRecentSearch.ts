import { useState } from 'react';

import type { RecentSearchItemType } from '../search.types';

const STORAGE_KEY = 'recentSearches';

const loadFromStorage = (): RecentSearchItemType[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as RecentSearchItemType[]) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (items: RecentSearchItemType[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const useRecentSearch = () => {
  const [items, setItems] = useState<RecentSearchItemType[]>(loadFromStorage);

  const addItem = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    const next = [
      { id: Date.now().toString(), query: trimmed },
      ...items.filter((i) => i.query !== trimmed),
    ];
    setItems(next);
    saveToStorage(next);
  };

  const removeItem = (id: string) => {
    const next = items.filter((i) => i.id !== id);
    setItems(next);
    saveToStorage(next);
  };

  const clearAll = () => {
    setItems([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { items, addItem, removeItem, clearAll };
};
