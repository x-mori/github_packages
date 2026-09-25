/**
 * Expand dot-separated property paths into nested objects.
 *
 * Unsafe path segments and conflicting parent/child paths throw. Existing leaf
 * objects supplied as values are never mutated.
 * @param flat - Object whose keys are dot paths.
 * @returns A new nested object with null-prototype containers.
 */
export function unflattenObject(object: Record<string, unknown>): Record<string, unknown>;
