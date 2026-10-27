const NBSP = " ";

/** Fills `{name}` placeholders: format("{n} styles", { n: 14 }) -> "14 styles". */
export function format(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}

/**
 * Applies French typographic spacing to every string in `value`: a no-break space
 * before ? ! : ; » and after «, so punctuation never wraps onto a line of its own.
 * Authors write plain spaces; this runs once when the French content is loaded.
 */
export function frenchTypography<T>(value: T): T {
  if (typeof value === "string") {
    return value.replace(/ (?=[?!:;»])/g, NBSP).replace(/(?<=«) /g, NBSP) as T;
  }
  if (Array.isArray(value)) return value.map(frenchTypography) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, frenchTypography(entry)]),
    ) as T;
  }
  return value;
}
