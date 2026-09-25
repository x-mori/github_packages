export function timeoutPromise(value, ms, message = 'Operation timed out') {
  if (!Number.isFinite(ms) || ms < 0) throw new RangeError('ms must be nonnegative and finite');
  let timer;
  return Promise.race([Promise.resolve(value), new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(message)), ms); })]).finally(() => clearTimeout(timer));
}
