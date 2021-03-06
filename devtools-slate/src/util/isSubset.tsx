export const isSubset = (superset: number[], subset: number[]): boolean => {
  if (subset.length > superset.length) return false;

  for (const i in subset) {
    if (subset[i] !== superset[i]) return false;
  }

  return true;
};
