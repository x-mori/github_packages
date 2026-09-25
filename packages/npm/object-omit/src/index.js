export function objectOmit(object, keys) {
  if (object === null || typeof object !== 'object' || !Array.isArray(keys)) throw new TypeError('expected an object and keys');
  const excluded = new Set(keys);
  const result = Object.create(null);
  for (const key of Reflect.ownKeys(object)) if (Object.getOwnPropertyDescriptor(object, key)?.enumerable && !excluded.has(key)) result[key] = object[key];
  return result;
}
