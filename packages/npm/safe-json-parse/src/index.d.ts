export type ParseResult<T> = { data: T; error: null } | { data: null; error: unknown };
export function safeJsonParse<T = unknown>(text: string, reviver?: (this: unknown, key: string, value: unknown) => unknown): ParseResult<T>;
