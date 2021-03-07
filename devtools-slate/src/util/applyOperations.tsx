import { Editor, Operation } from "slate";
import { ReactEditor } from "slate-react";

/**
 * Applies an array of opertion inside Editor.withoutNormalizing
 * block
 */
export const applyOperations = (
  operations: Operation[],
  editor: ReactEditor
) => {
  Editor.withoutNormalizing(editor, () => {
    operations.forEach((op) => {
      editor.apply(op);
    });
  });

  return [];
};
