/**
 * Read a nested own property without throwing on missing parents.
 *
 * Use a dot path or an array of path segments. The fallback is returned only
 * when a segment is absent; an existing undefined value remains undefined.
 * @param object - Object to read.
 * @param path - Dot path or segment array.
 * @param fallback - Value to return when the path is missing.
 * @returns The property value or fallback.
 */
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
