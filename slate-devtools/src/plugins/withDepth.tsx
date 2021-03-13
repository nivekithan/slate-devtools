import { NodeEntry, Transforms, Editor } from "slate";
import { ReactEditor } from "slate-react";

/**
 * This plugin will make sure that each node will have devtools_depth field
 * and its value will be the length of its path
 *
 * It is use render the marginLeft on DevSlate
 */

export const withDepth = (editor: ReactEditor) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;

    if (!Editor.isEditor(node) && !hasValidDepth(entry)) {
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

const hasValidDepth = ([node, path]: NodeEntry): boolean => {
  const { devtools_depth: depth } = node;

  // If there is node depth return false

  if (!depth) return false;

  // If the depth is not number return false

  if (typeof depth !== "number") return false;

  // If the depth is not length of path then return false

  if (depth !== path.length) return false;

  return true;
};
