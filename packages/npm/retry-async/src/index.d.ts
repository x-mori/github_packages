export function retryAsync<T>(operation: (attempt: number) => Promise<T> | T, options?: { attempts?: number; delay?: number; factor?: number }): Promise<T>;
