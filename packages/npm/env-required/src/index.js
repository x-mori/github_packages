export function envRequired(names, source = process.env) {
  const required = typeof names === 'string' ? [names] : names;
  if (!Array.isArray(required) || required.some(name => typeof name !== 'string' || !name)) throw new TypeError('names must be a nonempty string or an array of names');
  const missing = required.filter(name => !Object.hasOwn(source, name) || source[name] === '');
  if (missing.length) throw new Error(`Missing required environment variable${missing.length === 1 ? '' : 's'}: ${missing.join(', ')}`);
  return Object.fromEntries(required.map(name => [name, source[name]]));
}
