/**
 * Group items into a Map by a selected value.
 *
 * The selector can be a property name or a callback receiving the item and index.
 * Map keys retain their original types, including objects and symbols.
 * @param items - Items to group.
 * @param selector - Property name or key-producing callback.
 * @returns A Map from selected key to the items with that key.
 */
export function groupByKey(items, selector) {
  if (!Array.isArray(items) || (typeof selector !== 'function' && typeof selector !== 'string')) throw new TypeError('expected an array and a selector');
  const select = typeof selector === 'function' ? selector : item => item?.[selector];
  const groups = new Map();
  items.forEach((item, index) => { const key = select(item, index); if (!groups.has(key)) groups.set(key, []); groups.get(key).push(item); });
  return groups;
}
