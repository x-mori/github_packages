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
export function timeoutPromise(value, ms, message = 'Operation timed out') {
  if (!Number.isFinite(ms) || ms < 0) throw new RangeError('ms must be nonnegative and finite');
  let timer;
  return Promise.race([Promise.resolve(value), new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(message)), ms); })]).finally(() => clearTimeout(timer));
}
