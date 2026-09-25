/**
 * Keep the first item for each selected key.
 *
 * The selector can be a property name or a callback receiving the item and index.
 * Keys use Set equality, and the input array is not modified.
 * @param items - Items to deduplicate.
 * @param selector - Property name or key-producing callback.
 * @returns Items in their original order, with later duplicate keys removed.
 */
export function arrayUniqueBy<T, P extends keyof T>(items: T[], selector: P): T[];
export function arrayUniqueBy<T, K>(items: T[], selector: (item: T, index: number) => K): T[];
