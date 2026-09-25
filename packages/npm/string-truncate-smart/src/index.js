export function stringTruncateSmart(text, maxLength, suffix = '…') {
  if (typeof text !== 'string' || !Number.isSafeInteger(maxLength) || maxLength < 0 || typeof suffix !== 'string') throw new TypeError('invalid truncate arguments');
  if (text.length <= maxLength) return text;
  if (suffix.length > maxLength) throw new RangeError('suffix is longer than maxLength');
  const budget = maxLength - suffix.length;
  const start = text.slice(0, budget);
  const space = start.lastIndexOf(' ');
  const result = space > 0 ? start.slice(0, space).trimEnd() : start;
  return result + suffix;
}
