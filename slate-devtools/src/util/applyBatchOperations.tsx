import { Editor } from "slate";
import { ReactEditor } from "slate-react";
import { Batch, HistoryEditor } from "./historyEditor";

export const applyBatchOperations = (
  batches: Batch[],
  editor: HistoryEditor & ReactEditor
) => {
  Editor.withoutNormalizing(editor, () => {
    for (const batch of batches) {
      for (let i = 0; i < batch.data.length; i++) {
        const op = batch.data[i];

        if (i === 0) {
          editor.dontMerge = true;
        } else {
          editor.dontMerge = false;
        }

        editor.apply(op, { location: batch.location });
      }
    }
  });
  editor.dontMerge = false;

  return [];
};
