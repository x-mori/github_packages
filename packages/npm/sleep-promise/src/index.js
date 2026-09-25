export function sleepPromise(ms, { signal } = {}) {
  if (!Number.isFinite(ms) || ms < 0) throw new RangeError('ms must be nonnegative and finite');
  if (signal?.aborted) return Promise.reject(signal.reason ?? new DOMException('Aborted', 'AbortError'));
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => { signal?.removeEventListener('abort', abort); resolve(); }, ms);
    function abort() { clearTimeout(timer); reject(signal.reason ?? new DOMException('Aborted', 'AbortError')); }
    signal?.addEventListener('abort', abort, { once: true });
  });
}
