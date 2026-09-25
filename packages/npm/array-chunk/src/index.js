/**
 * Split an array into consecutive arrays of a fixed maximum size.
 *
 * The final chunk may be shorter. Items keep their original order and each chunk
 * is a new array.
 * @param items - Array to split.
 * @param size - Positive safe integer chunk size.
 * @returns An array of chunks; an empty input gives an empty array.
 */
export function arrayChunk(items, size) {
  if (!Array.isArray(items) || !Number.isSafeInteger(size) || size < 1) throw new TypeError('expected an array and a positive integer size');
  const chunks = [];
  for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size));
  return chunks;
}
