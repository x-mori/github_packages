export function slugifyLite(text) {
  if (typeof text !== 'string') throw new TypeError('text must be a string');
  return text.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
