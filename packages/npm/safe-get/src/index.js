export function safeGet(object, path, fallback) {
  const parts = Array.isArray(path) ? path : typeof path === 'string' ? path.split('.') : null;
  if (!parts || parts.some(part => part === '')) throw new TypeError('path must be a nonempty string or segment array');
  let current = object;
  for (const part of parts) {
    if (current == null || !Object.hasOwn(Object(current), part)) return fallback;
    current = current[part];
  }
  return current;
}
