import { atom, useAtom } from "jotai";
import { createEditor, Editor } from "slate";
import { ReactEditor, withReact } from "slate-react";
import { withHistory } from "../plugins/withHistory";
import { HistoryEditor } from "../util/historyEditor";

/**
 * I dont think not using useMemo will lead to any problem, if thats not case let me know
 */

const devEditorAtom = atom<Editor & ReactEditor & HistoryEditor>(
  withHistory(withReact(createEditor()))
);

const devEditorAtomRead = atom((get) => get(devEditorAtom));

export const useDevEditorRead = () => {
  return useAtom(devEditorAtomRead);
};
