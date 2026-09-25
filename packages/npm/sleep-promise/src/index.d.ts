/**
 * Resolve after a nonnegative number of milliseconds.
 *
 * An AbortSignal rejects the wait with its reason and clears the timer. A signal
 * that is already aborted rejects immediately.
 * @param ms - Delay in milliseconds.
 * @param options - Optional AbortSignal.
 * @returns A promise that resolves when the timer completes.
 */
export function sleepPromise(ms: number, options?: { signal?: AbortSignal }): Promise<void>;
