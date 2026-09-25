/**
 * Remove null and undefined values from a shallow object copy.
 *
 * Set emptyStrings to true to remove empty strings as well. Zero, false, arrays,
 * and nested objects remain unchanged.
 * @param object - Object to filter.
 * @param options - Whether to remove empty strings.
 * @returns A new object with matching values removed.
 */
export function removeEmptyValues(object, { emptyStrings = false } = {}) {
  if (object === null || typeof object !== 'object' || Array.isArray(object)) throw new TypeError('expected an object');
  return Object.fromEntries(Object.entries(object).filter(([, value]) => value != null && !(emptyStrings && value === '')));
}
