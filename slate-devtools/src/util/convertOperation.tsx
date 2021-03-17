import { Node, Operation, Path } from "slate";

/**
 * Converts the given operation into ReturnConvertOperation type so that it will be easy to render
 *
 * if you know some other way to write this code so that it would be readable
 * please open a pr
 *
 */

type CorrectOperation = Partial<{
  newPath: Path;
  node: Node;
  newProperties: Partial<Node>;
  offset: number;
  position: number;
  properties: Partial<Node>;
  text: string;
}> & { type: string; path: Path };

type NewProperties =
  | {
      renderNewProperties: true;
      newProperties: Partial<Node> | Record<string, never>;
      newPath: Path;
    }
  | { renderNewProperties: false; newProperties: null; newPath: null };
type OldProperties = [Partial<Node> | Record<string, never>, Path];
type Offset =
  | { renderOffset: true; offset: number }
  | { renderOffset: false; offset: null };
type Position =
  | { renderPosition: true; position: number }
  | { renderPosition: false; position: null };

type ReturnConvertOperation = {
  newProperties: NewProperties;
  oldProperties: OldProperties;
  type: string;
  offset: Offset;
  position: Position;
};

export const convertOperation = (op: Operation): ReturnConvertOperation => {
  const {
    newPath,
    node,
    newProperties,
    offset,
    path,
    position,
    properties,
    text,
    type,
  } = op as CorrectOperation;

  return {
    newProperties:
      newPath || newProperties
        ? {
            renderNewProperties: true,
            newProperties: newProperties || {},
            newPath: newPath || path,
          }
        : {
            renderNewProperties: false,
            newProperties: null,
            newPath: null,
          },
    oldProperties: [
      properties || node || (typeof text === "string" ? { text } : {}),
      path,
    ],
    type,
    offset:
      typeof offset === "number"
        ? { renderOffset: true, offset }
        : { renderOffset: false, offset: null },
    position:
      typeof position === "number"
        ? { renderPosition: true, position }
        : { renderPosition: false, position: null },
  };
};
