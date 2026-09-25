export function removeEmptyValues(object, { emptyStrings = false } = {}) {
  if (object === null || typeof object !== 'object' || Array.isArray(object)) throw new TypeError('expected an object');
  return Object.fromEntries(Object.entries(object).filter(([, value]) => value != null && !(emptyStrings && value === '')));
}
