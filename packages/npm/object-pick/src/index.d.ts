export function objectPick<T extends object, K extends keyof T>(object: T, keys: readonly K[]): Pick<T, K>;
