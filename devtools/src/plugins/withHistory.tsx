import { nanoid } from "nanoid";
import { Editor, Operation, Path } from "slate";
import { Batch, HistoryEditor } from "../util/historyEditor";

export const withHistory = <T extends Editor>(editor: T) => {
  const e = editor as T & HistoryEditor;
  const { apply, normalizeNode } = e;
  e.history = [];
  e.shouldSave = true;
  e.isNormalizing = false;

  e.normalizeNode = (entry) => {
    e.isNormalizing = true;
    normalizeNode(entry);
    e.isNormalizing = false;
  };

  e.apply = (op) => {
    if (op.type === "set_selection") {
      return apply(op);
    }

    const { operations, history, isNormalizing, shouldSave } = e;

    if (!shouldSave) {
      return apply(op);
    }

    const lastBatch = history[history.length - 1] as Batch | undefined;
    const lastOp = lastBatch && lastBatch.data[lastBatch.data.length - 1];
    let merge = false;

    if (!lastBatch) {
      merge = false;
    } else if (lastBatch.normalizing !== isNormalizing) {
      merge = false;
    } else if (operations.length !== 0) {
      merge = true;
    } else {
      merge = shouldMerge(op, lastOp);
    }

    if (lastBatch && merge) {
      lastBatch.data.push(op);
    } else {
      const batch: Batch = {
        normalizing: isNormalizing,
        data: [op],
        id: nanoid(),
      };

      history.push(batch);
    }

    if (history.length > 100) {
      history.shift();
    }

    apply(op);
  };

  return e;
};

const shouldMerge = (op: Operation, prev: Operation | undefined): boolean => {
  if (
    prev &&
    op.type === "insert_text" &&
    prev.type === "insert_text" &&
    op.offset === prev.offset + prev.text.length &&
    Path.equals(op.path, prev.path)
  ) {
    return true;
  }

  if (
    prev &&
    op.type === "remove_text" &&
    prev.type === "remove_text" &&
    op.offset + op.text.length === prev.offset &&
    Path.equals(op.path, prev.path)
  ) {
    return true;
  }

  return false;
};
