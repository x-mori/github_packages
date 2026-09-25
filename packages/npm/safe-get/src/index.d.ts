/**
 * Read a nested own property without throwing on missing parents.
 *
 * Use a dot path or an array of path segments. The fallback is returned only
 * when a segment is absent; an existing undefined value remains undefined.
 * @param object - Object to read.
 * @param path - Dot path or segment array.
 * @param fallback - Value to return when the path is missing.
 * @returns The property value or fallback.
 */
export function safeGet<T = unknown>(object: unknown, path: string | readonly PropertyKey[], fallback?: T): T;
