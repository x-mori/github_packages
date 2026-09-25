/**
 * Copy own, enumerable properties except selected keys.
 *
 * The source is not changed. The result has a null prototype to keep special
 * property names safe.
 * @param object - Source object.
 * @param keys - Keys to exclude.
 * @returns A new object with the remaining own properties.
 */
export function objectOmit<T extends object, K extends keyof T>(object: T, keys: readonly K[]): Omit<T, K>;
