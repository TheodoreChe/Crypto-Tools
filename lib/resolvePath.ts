/**
 * getByPath - Get a value from an object by a path
 */
export default function getByPath(obj: Record<string, any>, path: string) {
  return path
    .split(/[\.\[\]\'\"]/)
    .filter(Boolean)
    .reduce((acc, c) => acc?.[c], obj)
}
