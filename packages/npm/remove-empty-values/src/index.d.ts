/**
 * Remove null and undefined values from a shallow object copy.
 *
 * Set emptyStrings to true to remove empty strings as well. Zero, false, arrays,
 * and nested objects remain unchanged.
 * @param object - Object to filter.
 * @param options - Whether to remove empty strings.
 * @returns A new object with matching values removed.
 */
export function removeEmptyValues<T extends Record<string, unknown>>(object: T, options?: { emptyStrings?: boolean }): Partial<T>;
