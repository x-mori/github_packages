const isRecord = value => value !== null && typeof value === 'object' && (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
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
