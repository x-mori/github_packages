/**
 * Split an array into consecutive arrays of a fixed maximum size.
 *
 * The final chunk may be shorter. Items keep their original order and each chunk
 * is a new array.
 * @param items - Array to split.
 * @param size - Positive safe integer chunk size.
 * @returns An array of chunks; an empty input gives an empty array.
 */
export function arrayChunk<T>(items: T[], size: number): T[][];
