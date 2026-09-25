export function groupByKey<T, P extends keyof T>(items: T[], selector: P): Map<T[P], T[]>;
export function groupByKey<T, K>(items: T[], selector: (item: T, index: number) => K): Map<K, T[]>;
