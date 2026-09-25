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
export function envRequired(names: string | readonly string[], source?: Record<string, string | undefined>): Record<string, string | undefined>;
