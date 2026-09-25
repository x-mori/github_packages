/**
 * Reject if a promise does not settle before a deadline.
 *
 * The timer is cleared on settlement. This wrapper cannot cancel the underlying
 * operation; pass a separate AbortSignal to that operation when cancellation matters.
 * @param value - Promise or plain value to await.
 * @param ms - Deadline in milliseconds.
 * @param message - Error message used when the deadline expires.
 * @returns The original settled value.
 */
export function timeoutPromise<T>(value: PromiseLike<T> | T, ms: number, message?: string): Promise<T>;
