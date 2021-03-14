import { Editor, Operation } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "./historyEditor";

/**
 * Applies an array of opertion inside Editor.withoutNormalizing
 * block
 */
export const applyOperations = (
  operations: Operation[],
  editor: ReactEditor | (ReactEditor & HistoryEditor),
  options: { location?: "App" | "Devtools" } = {}
) => {
  /**
   * If the editor is HistoryEditor then we will apply the operations with options
   * provided
   */

  if (HistoryEditor.isHistoryEditor(editor)) {
    Editor.withoutNormalizing(editor, () => {
      operations.forEach((op) => {
        editor.apply(op, options);
      });
    });
  } else {
    Editor.withoutNormalizing(editor, () => {
      operations.forEach((op) => {
        editor.apply(op);
      });
    });
  }
  return [];
};
