import { Snackbar } from './Snackbar';
import { useSnackbarStore } from '@/shared/stores/snackbar.store';

export const SnackbarHost = () => {
  const current = useSnackbarStore((state) => state.current);
  const hideSnackbar = useSnackbarStore((state) => state.hideSnackbar);

  if (!current) return null;

  return (
    <Snackbar
      key={current.id}
      message={current.message}
      variant={current.variant}
      placement={current.placement}
      onClose={() => hideSnackbar(current.id)}
      className="w-fit"
      {...(current.action ? { action: current.action } : {})}
    />
  );
};
