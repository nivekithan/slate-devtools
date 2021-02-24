import { NodeEntry, Transforms } from "slate";
import { ReactEditor } from "slate-react";

export const withDepth = (editor: ReactEditor) => {
  const { normalizeNode } = editor;

  // Overwriting the normalize node functionality of editor
  editor.normalizeNode = (entry) => {
    const [, path] = entry;

    if (!hasValidDepth(entry)) {
      Transforms.setNodes(
        editor,
        { devtools_depth: path.length },
        { at: path }
      );
    }

    normalizeNode(entry);
  };

  return editor;
};

const hasValidDepth = ([node, path]: NodeEntry) => {
  const { devtools_depth: depth } = node;

  // If there is node depth return false

  if (!depth) return false;

  // If the depth is not number return false

  if (typeof depth !== "number") return false;

  // If the depth is not length of path then return false

  if (depth !== path.length) return false;
};
