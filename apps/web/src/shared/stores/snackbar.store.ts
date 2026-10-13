import { create } from 'zustand';

import type { SnackbarPlacement } from '@/shared/constants';

export type SnackbarVariant = 'default' | 'error';

export interface SnackbarAction {
  label: string;
  onClick: () => void;
}

interface SnackbarItem {
  id: number;
  message: string;
  variant: SnackbarVariant;
  placement: SnackbarPlacement;
  action?: SnackbarAction;
}

interface ShowSnackbarOptions {
  variant?: SnackbarVariant;
  placement?: SnackbarPlacement;
  action?: SnackbarAction;
}

interface SnackbarState {
  current: SnackbarItem | null;
  showSnackbar: (message: string, options?: ShowSnackbarOptions) => void;
  hideSnackbar: (id?: number) => void;
}

let nextSnackbarId = 0;

export const useSnackbarStore = create<SnackbarState>((set) => ({
  current: null,
  showSnackbar: (message, options = {}) =>
    set({
      current: {
        id: ++nextSnackbarId,
        message,
        variant: options.variant ?? 'default',
        placement: options.placement ?? 'default',
        ...(options.action ? { action: options.action } : {}),
      },
    }),
  hideSnackbar: (id) =>
    set((state) => {
      if (!state.current || (id !== undefined && state.current.id !== id)) {
        return state;
      }

      return { current: null };
    }),
}));
