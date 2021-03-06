import { Editor, Operation } from "slate";
import { ReactEditor } from "slate-react";

export const applyOperations = (
  operations: Operation[],
  editor: ReactEditor
) => {
  Editor.withoutNormalizing(editor, () => {
    for (const opertion of operations) {
      editor.apply(opertion);
    }
  });

  return [];
};
