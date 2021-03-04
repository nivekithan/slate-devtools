import { atom, useAtom } from "jotai";
import { createEditor, Editor } from "slate";
import { ReactEditor, withReact } from "slate-react";
import { withDepth, withId, withIndex } from "../plugins";
import { withHistory } from "../plugins/withHistory";
import { HistoryEditor } from "../util/historyEditor";
import { fromAtom } from "./from";

const devEditorAtom = atom<Editor & ReactEditor & HistoryEditor>((get) =>
  withHistory(
    withDepth(withId(withIndex(withReact(createEditor()))))
  )
);

const devEditorAtomRead = atom((get) => get(devEditorAtom));

export const useDevEditorRead = () => {
  const atomValue = useAtom(devEditorAtomRead);

  return atomValue;
};
