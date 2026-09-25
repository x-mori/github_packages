export function unflattenObject(flat) {
  if (flat === null || typeof flat !== 'object' || Array.isArray(flat)) throw new TypeError('expected a flat object');
  const result = Object.create(null);
  const nodes = new WeakSet([result]);
  for (const [path, value] of Object.entries(flat)) {
    const parts = path.split('.');
    if (parts.some(part => !part || ['__proto__','constructor','prototype'].includes(part))) throw new TypeError('unsafe dot path');
    let current = result;
    for (const part of parts.slice(0, -1)) {
      if (!Object.hasOwn(current, part)) { current[part] = Object.create(null); nodes.add(current[part]); }
      if (!nodes.has(current[part])) throw new TypeError('conflicting dot paths');
      current = current[part];
    }
    const last = parts.at(-1);
    if (Object.hasOwn(current, last)) throw new TypeError('duplicate or conflicting dot paths');
    current[last] = value;
  }
  return result;
}
