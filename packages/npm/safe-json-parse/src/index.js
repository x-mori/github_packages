export function safeJsonParse(text, reviver) {
  try { return { data: JSON.parse(text, reviver), error: null }; }
  catch (error) { return { data: null, error }; }
}
