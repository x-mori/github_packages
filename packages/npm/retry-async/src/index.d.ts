/**
 * Call an operation until it succeeds or the attempt limit is reached.
 *
 * The callback receives its one-based attempt number. Delay starts after the
 * first failure and grows by factor; the final rejection is rethrown unchanged.
 * @param operation - Function to invoke on each attempt.
 * @param options - Positive attempt count, initial delay in milliseconds, and backoff factor.
 * @returns The first successful result.
 * @throws The final operation error, or an invalid-options error.
 */
export function retryAsync<T>(operation: (attempt: number) => Promise<T> | T, options?: { attempts?: number; delay?: number; factor?: number }): Promise<T>;
