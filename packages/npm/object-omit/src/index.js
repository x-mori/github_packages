/**
 * Copy own, enumerable properties except selected keys.
 *
 * The source is not changed. The result has a null prototype to keep special
 * property names safe.
 * @param object - Source object.
 * @param keys - Keys to exclude.
 * @returns A new object with the remaining own properties.
 */
export function objectOmit(object, keys) {
  if (object === null || typeof object !== 'object' || !Array.isArray(keys)) throw new TypeError('expected an object and keys');
  const excluded = new Set(keys);
  const result = Object.create(null);
  for (const key of Reflect.ownKeys(object)) if (Object.getOwnPropertyDescriptor(object, key)?.enumerable && !excluded.has(key)) result[key] = object[key];
  return result;
}
