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
