const isRecord = value => value !== null && typeof value === 'object' && (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
/**
 * Turn nested plain objects into dot-separated property paths.
 *
 * Arrays and empty objects remain leaf values. Keys containing dots or unsafe
 * prototype names are rejected to keep paths unambiguous and safe.
 * @param object - Plain object to flatten.
 * @returns A null-prototype object keyed by dot paths.
 */
export function flattenObject(object) {
  if (!isRecord(object)) throw new TypeError('expected a plain object');
  const result = Object.create(null);
  function visit(value, prefix) {
    for (const [key, item] of Object.entries(value)) {
      if (!key || key.includes('.') || ['__proto__','constructor','prototype'].includes(key)) throw new TypeError('object keys must be safe dot path segments');
      const path = prefix ? `${prefix}.${key}` : key;
      if (isRecord(item) && Object.keys(item).length) visit(item, path); else result[path] = item;
    }
  }
  visit(object, ''); return result;
}
