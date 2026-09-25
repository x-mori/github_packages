export function deepFreeze(value, seen = new WeakSet()) {
  if (value === null || typeof value !== 'object' || seen.has(value)) return value;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) deepFreeze(value[key], seen);
  if (!(ArrayBuffer.isView(value) && value.byteLength > 0)) Object.freeze(value);
  return value;
}
