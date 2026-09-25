/**
 * Freeze nested objects and arrays in place.
 *
 * A WeakSet prevents infinite recursion on cycles. Nonempty typed-array views
 * cannot be frozen in JavaScript and are left unfrozen.
 * @param value - Value to freeze recursively.
 * @returns The original value after freezing supported objects.
 */
export function deepFreeze(value, seen = new WeakSet()) {
  if (value === null || typeof value !== 'object' || seen.has(value)) return value;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) deepFreeze(value[key], seen);
  if (!(ArrayBuffer.isView(value) && value.byteLength > 0)) Object.freeze(value);
  return value;
}
