/**
 * Turn nested plain objects into dot-separated property paths.
 *
 * Arrays and empty objects remain leaf values. Keys containing dots or unsafe
 * prototype names are rejected to keep paths unambiguous and safe.
 * @param object - Plain object to flatten.
 * @returns A null-prototype object keyed by dot paths.
 */
export function flattenObject(object: Record<string, unknown>): Record<string, unknown>;
