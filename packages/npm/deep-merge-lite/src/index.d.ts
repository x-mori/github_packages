/**
 * Merge two plain objects without changing either input.
 *
 * Nested plain objects merge recursively. Arrays replace earlier arrays and are
 * shallow-copied. Prototype-related keys are ignored to prevent pollution.
 * @param left - Base plain object.
 * @param right - Plain object whose values take precedence.
 * @returns A new null-prototype object with merged properties.
 */
export function deepMergeLite<L extends Record<string, unknown>, R extends Record<string, unknown>>(left: L, right: R): L & R;
