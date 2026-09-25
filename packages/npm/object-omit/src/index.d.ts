export function objectOmit<T extends object, K extends keyof T>(object: T, keys: readonly K[]): Omit<T, K>;
