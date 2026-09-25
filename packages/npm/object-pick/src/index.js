export function objectPick(object, keys) {
  if (object === null || typeof object !== 'object' || !Array.isArray(keys)) throw new TypeError('expected an object and keys');
  const result = Object.create(null);
  for (const key of keys) if (Object.hasOwn(object, key)) result[key] = object[key];
  return result;
}
