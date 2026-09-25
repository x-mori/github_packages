export function arrayUniqueBy(items, selector) {
  if (!Array.isArray(items) || (typeof selector !== 'function' && typeof selector !== 'string')) throw new TypeError('expected an array and a selector');
  const select = typeof selector === 'function' ? selector : item => item?.[selector];
  const seen = new Set();
  return items.filter((item, index) => { const key = select(item, index); if (seen.has(key)) return false; seen.add(key); return true; });
}
