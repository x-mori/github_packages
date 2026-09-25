/**
 * Keep the first item for each selected key.
 *
 * The selector can be a property name or a callback receiving the item and index.
 * Keys use Set equality, and the input array is not modified.
 * @param items - Items to deduplicate.
 * @param selector - Property name or key-producing callback.
 * @returns Items in their original order, with later duplicate keys removed.
 */
export function arrayUniqueBy(items, selector) {
  if (!Array.isArray(items) || (typeof selector !== 'function' && typeof selector !== 'string')) throw new TypeError('expected an array and a selector');
  const select = typeof selector === 'function' ? selector : item => item?.[selector];
  const seen = new Set();
  return items.filter((item, index) => { const key = select(item, index); if (seen.has(key)) return false; seen.add(key); return true; });
}
