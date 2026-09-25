export function arrayUniqueBy<T, P extends keyof T>(items: T[], selector: P): T[];
export function arrayUniqueBy<T, K>(items: T[], selector: (item: T, index: number) => K): T[];
