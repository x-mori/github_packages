export type ParseResult<T> = { data: T; error: null } | { data: null; error: unknown };
/**
 * Parse JSON into a result object without throwing for invalid JSON.
 *
 * Success has a value in data and a null error. Failure has null data and the
 * original parse error, so JSON null remains distinguishable by the error field.
 * @param text - JSON text to parse.
 * @param reviver - Optional JSON.parse reviver.
 * @returns The parsed data or the parsing error.
 */
export function safeJsonParse<T = unknown>(text: string, reviver?: (this: unknown, key: string, value: unknown) => unknown): ParseResult<T>;
