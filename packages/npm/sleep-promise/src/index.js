/**
 * Resolve after a nonnegative number of milliseconds.
 *
 * An AbortSignal rejects the wait with its reason and clears the timer. A signal
 * that is already aborted rejects immediately.
 * @param ms - Delay in milliseconds.
 * @param options - Optional AbortSignal.
 * @returns A promise that resolves when the timer completes.
 */
export function sleepPromise(ms, { signal } = {}) {
  if (!Number.isFinite(ms) || ms < 0) throw new RangeError('ms must be nonnegative and finite');
  if (signal?.aborted) return Promise.reject(signal.reason ?? new DOMException('Aborted', 'AbortError'));
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => { signal?.removeEventListener('abort', abort); resolve(); }, ms);
    function abort() { clearTimeout(timer); reject(signal.reason ?? new DOMException('Aborted', 'AbortError')); }
    signal?.addEventListener('abort', abort, { once: true });
  });
}
