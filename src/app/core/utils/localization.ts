export function getLocalized(
    field: Record<string, string> | undefined,
    lang: string,
    fallbacks: string[] = ['en', 'de']
): string | undefined {
    if (!field) return undefined;
    if (field[lang]) return field[lang];
    for (const f of fallbacks) {
        if (field[f]) return field[f];
    }
    const keys = Object.keys(field);
    return keys.length ? field[keys[0]] : undefined;
}
