import { HistoryEditor } from "../plugins/withHistory";

export const withoutSaving = (
  editor: HistoryEditor,
  callback: () => unknown
) => {
  editor.shouldSave = false;
  callback();
  editor.shouldSave = true;
};
