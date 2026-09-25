/**
 * Parse JSON into a result object without throwing for invalid JSON.
 *
 * Success has a value in data and a null error. Failure has null data and the
 * original parse error, so JSON null remains distinguishable by the error field.
 * @param text - JSON text to parse.
 * @param reviver - Optional JSON.parse reviver.
 * @returns The parsed data or the parsing error.
 */
export function safeJsonParse(text, reviver) {
  try { return { data: JSON.parse(text, reviver), error: null }; }
  catch (error) { return { data: null, error }; }
}
