/**
 * Finds if two arrays whose elements are only number are equal
 */

export const isArrayEqual = (first: number[], second: number[]) => {
  if (first.length !== second.length) return false;

  for (const i in first) {
    if (first[i] !== second[i]) {
      return false;
    }
  }
  return true;
};
