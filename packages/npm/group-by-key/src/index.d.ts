/**
 * Group items into a Map by a selected value.
 *
 * The selector can be a property name or a callback receiving the item and index.
 * Map keys retain their original types, including objects and symbols.
 * @param items - Items to group.
 * @param selector - Property name or key-producing callback.
 * @returns A Map from selected key to the items with that key.
 */
export function groupByKey<T, P extends keyof T>(items: T[], selector: P): Map<T[P], T[]>;
export function groupByKey<T, K>(items: T[], selector: (item: T, index: number) => K): Map<K, T[]>;
