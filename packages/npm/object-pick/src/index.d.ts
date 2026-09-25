/**
 * Copy selected own, enumerable properties into a new object.
 *
 * Missing keys are ignored. The result has a null prototype so special property
 * names cannot alter its prototype.
 * @param object - Source object.
 * @param keys - Keys to include.
 * @returns A new object containing the requested own properties.
 */
export function objectPick<T extends object, K extends keyof T>(object: T, keys: readonly K[]): Pick<T, K>;
