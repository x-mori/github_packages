/**
 * Freeze nested objects and arrays in place.
 *
 * A WeakSet prevents infinite recursion on cycles. Nonempty typed-array views
 * cannot be frozen in JavaScript and are left unfrozen.
 * @param value - Value to freeze recursively.
 * @returns The original value after freezing supported objects.
 */
export function deepFreeze<T>(value: T): Readonly<T>;
