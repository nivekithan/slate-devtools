import { Editor, Operation } from "slate";
import { ReactEditor } from "slate-react";

export const applyOperations = (
  ref: { current: Operation[] },
  editor: ReactEditor
) => {
  const { current } = ref;

  Editor.withoutNormalizing(editor, () => {
    for (const opertion of current) {
      editor.apply(opertion);
    }
  });

  return [];
};
