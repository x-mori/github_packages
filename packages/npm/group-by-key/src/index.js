export function groupByKey(items, selector) {
  if (!Array.isArray(items) || (typeof selector !== 'function' && typeof selector !== 'string')) throw new TypeError('expected an array and a selector');
  const select = typeof selector === 'function' ? selector : item => item?.[selector];
  const groups = new Map();
  items.forEach((item, index) => { const key = select(item, index); if (!groups.has(key)) groups.set(key, []); groups.get(key).push(item); });
  return groups;
}
