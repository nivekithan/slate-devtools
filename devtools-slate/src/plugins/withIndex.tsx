import { NodeEntry, Editor, Transforms } from "slate";
import { ReactEditor } from "slate-react";

export const withIndex = (editor: ReactEditor): ReactEditor => {
  const { normalizeNode } = editor;

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;

    if (!Editor.isEditor(node) && !hasValidIndex(entry)) {
      Transforms.setNodes(
        editor,
        { devtools_index: path[path.length - 1] },
        { at: path }
      );
    }
    normalizeNode(entry);
  };

  return editor;
};

const hasValidIndex = ([node, path]: NodeEntry): boolean => {
  const { devtools_index } = node;

  if (!devtools_index) return false;

  if (typeof devtools_index !== "number") return false;

  if (devtools_index !== path[path.length - 1]) return false;

  return true;
};
