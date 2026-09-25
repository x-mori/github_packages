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
export async function retryAsync(operation, { attempts = 3, delay = 0, factor = 2 } = {}) {
  if (typeof operation !== 'function' || !Number.isInteger(attempts) || attempts < 1 || !Number.isFinite(delay) || delay < 0 || !Number.isFinite(factor) || factor < 1) throw new TypeError('invalid retry options');
  for (let attempt = 1; ; attempt++) {
    try { return await operation(attempt); }
    catch (error) {
      if (attempt >= attempts) throw error;
      const wait = delay * factor ** (attempt - 1);
      if (!Number.isFinite(wait)) throw new RangeError('retry delay overflow');
      if (wait) await new Promise(resolve => setTimeout(resolve, wait));
    }
  }
}
