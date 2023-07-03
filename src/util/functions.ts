

export function slugifyVariableName(variableName: string, delimiter = '_') {
  const slug = variableName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, delimiter)
    .replace(/[^a-z0-9_-]+/g, '')
    .replace(/^-+|-+$/g, '')
    .replace(/-/g, '_')

  return slug;

}