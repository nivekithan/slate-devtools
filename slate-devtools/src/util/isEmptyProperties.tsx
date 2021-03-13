import { Node, Path } from "slate";

type Props = {
  node: Node;
  path: Path;
};

/**
 * Will check if the given properties is equal to the object
 * {
 *   path : [],
 *   node : {
 *      children : []
 *    }
 * }
 */

export const isEmptyProperties = (properties: Props): boolean => {
  const { node, path } = properties;

  if (path.length !== 0) return false;

  const keys = Object.keys(node);

  if (keys.length !== 1) return false;

  if (keys[0] !== "children") return false;

  return true;
};
