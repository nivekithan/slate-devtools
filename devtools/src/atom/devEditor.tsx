import { atom, useAtom } from "jotai";
import { createEditor } from "slate";
import { ReactEditor, withReact } from "slate-react";
import { withDepth, withId, withIndex } from "../plugins";

const devEditorAtom = atom<ReactEditor>(
  withDepth(withId(withIndex(withReact(createEditor()))))
);

const devEditorAtomRead = atom((get) => get(devEditorAtom));

export const useDevEditorRead = () => {
  const atomValue = useAtom(devEditorAtomRead);


  return atomValue
};
