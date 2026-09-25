export function arrayChunk(items, size) {
  if (!Array.isArray(items) || !Number.isSafeInteger(size) || size < 1) throw new TypeError('expected an array and a positive integer size');
  const chunks = [];
  for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size));
  return chunks;
}
