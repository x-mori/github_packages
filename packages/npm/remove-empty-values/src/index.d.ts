export function removeEmptyValues<T extends Record<string, unknown>>(object: T, options?: { emptyStrings?: boolean }): Partial<T>;
