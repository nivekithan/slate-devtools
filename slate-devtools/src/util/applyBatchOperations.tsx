import { Editor } from "slate";
import { ReactEditor } from "slate-react";
import { Batch, HistoryEditor } from "./historyEditor";
/**
 * Applies a batch of operations without normalizing in between but also making sure in HistoryEditor
 * Operation will be reflected as Seperate Batches
 */

export const applyBatchOperations = (
  operations: Batch[],
  editor: ReactEditor & HistoryEditor
) => {
  operations.forEach((batch) => {
    const { data, location, normalizing } = batch;
    editor.isNormalizing = normalizing;

    Editor.withoutNormalizing(editor, () => {
      data.forEach((op, i) => {
        if (i === 0) {
          editor.dontMerge = true;
        } else {
          editor.dontMerge = false;
        }
        editor.apply(op, { location });
      });
      editor.dontMerge = false;
    });
  });

  return [];
};
