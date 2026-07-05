export type FloatingPlacement = 'default' | 'bottomBar';

export type SnackbarPlacement =
  | FloatingPlacement
  | 'onboardingBottom48'
  | 'onboardingBottom72';

export const FLOATING_PLACEMENT_CLASS = {
  default: 'bottom-10',
  bottomBar: 'bottom-24',
  onboardingBottom48: 'bottom-48',
  onboardingBottom72: 'bottom-72',
} satisfies Record<SnackbarPlacement, string>;
