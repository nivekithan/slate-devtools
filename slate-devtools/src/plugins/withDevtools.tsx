import { Operation } from "slate";
import { ReactEditor } from "slate-react";
import { dont_save_to_history, editor_to_isNormalizing } from "../util/weekmap";

export type DevtoolsEditor = {
  devtools_history: { normalizing: boolean; op: Operation }[];
  devtools_run: (op: Operation) => void;
  devtools_reset: () => void;
};

export const withDevtools = <T extends ReactEditor>(
  editor: T
): T & DevtoolsEditor => {
  const e = editor as T & DevtoolsEditor;
  const { apply, normalizeNode } = e;

  e.devtools_history = [];

  e.normalizeNode = (entry) => {
    editor_to_isNormalizing.set(e, true);
    normalizeNode(entry);
    editor_to_isNormalizing.set(e, false);
  };

  e.devtools_run = (op) => {
    if (op.type === "set_selection") {
      return;
    }

    const isNormalizing = !!editor_to_isNormalizing.get(e);
    const { devtools_history: history } = e;

    if (dont_save_to_history.get(e)) {
      if (isNormalizing) {
        history.push({ op: op, normalizing: isNormalizing });
      }
      return;
    }

    history.push({ op: op, normalizing: isNormalizing });
  };

  e.apply = (op: Operation, ...rest) => {
    e.devtools_run(op);
    apply(op, ...rest);
  };

  e.devtools_reset = () => {
    e.devtools_history = [];
  };

  return e;
};
