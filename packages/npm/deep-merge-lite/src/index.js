const isRecord = value => value !== null && typeof value === 'object' && (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
const blocked = new Set(['__proto__', 'constructor', 'prototype']);
/**
 * Merge two plain objects without changing either input.
 *
 * Nested plain objects merge recursively. Arrays replace earlier arrays and are
 * shallow-copied. Prototype-related keys are ignored to prevent pollution.
 * @param left - Base plain object.
 * @param right - Plain object whose values take precedence.
 * @returns A new null-prototype object with merged properties.
 */
export function deepMergeLite(left, right) {
  if (!isRecord(left) || !isRecord(right)) throw new TypeError('expected plain objects');
  const result = Object.create(null);
  for (const source of [left, right]) for (const [key, value] of Object.entries(source)) {
    if (blocked.has(key)) continue;
    result[key] = source === right && isRecord(value) && isRecord(result[key]) ? deepMergeLite(result[key], value) : isRecord(value) ? deepMergeLite({}, value) : Array.isArray(value) ? value.slice() : value;
  }
  return result;
}
