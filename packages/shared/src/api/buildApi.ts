export const buildPath = (
  template: string,
  params: Record<string, string | number>
) =>
  Object.entries(params).reduce(
    (path, [key, value]) => path.replace(`:${key}`, String(value)),
    template
  );
