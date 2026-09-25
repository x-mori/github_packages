/**
 * Copy selected own, enumerable properties into a new object.
 *
 * Missing keys are ignored. The result has a null prototype so special property
 * names cannot alter its prototype.
 * @param object - Source object.
 * @param keys - Keys to include.
 * @returns A new object containing the requested own properties.
 */
export function objectPick(object, keys) {
  if (object === null || typeof object !== 'object' || !Array.isArray(keys)) throw new TypeError('expected an object and keys');
  const result = Object.create(null);
  for (const key of keys) if (Object.hasOwn(object, key)) result[key] = object[key];
  return result;
}
