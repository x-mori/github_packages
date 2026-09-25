/**
 * Read one or more required environment variables from a mapping.
 *
 * An absent key or empty string counts as missing. The error lists every missing
 * name, and the returned object contains only the requested keys.
 * @param names - Variable name or names to require.
 * @param source - Environment mapping, defaulting to process.env.
 * @returns A new object containing the requested values.
 * @throws Error when a required variable is absent or empty.
 */
export function envRequired(names, source = process.env) {
  const required = typeof names === 'string' ? [names] : names;
  if (!Array.isArray(required) || required.some(name => typeof name !== 'string' || !name)) throw new TypeError('names must be a nonempty string or an array of names');
  const missing = required.filter(name => !Object.hasOwn(source, name) || source[name] === '');
  if (missing.length) throw new Error(`Missing required environment variable${missing.length === 1 ? '' : 's'}: ${missing.join(', ')}`);
  return Object.fromEntries(required.map(name => [name, source[name]]));
}
