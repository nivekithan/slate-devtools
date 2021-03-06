import { nanoid } from "nanoid";
import { Editor, Operation, Path } from "slate";
import { Batch, HistoryEditor } from "../util/historyEditor";

export const withHistory = <T extends Editor>(editor: T) => {
  const e = editor as T & HistoryEditor;
  const { apply, normalizeNode } = e;
  e.history = [];
  e.shouldSave = true;
  e.isNormalizing = false;
  e.shouldNormalize = true;
  e.from = undefined;

  e.normalizeNode = (entry) => {
    if (e.shouldNormalize) {
      e.isNormalizing = true;
      normalizeNode(entry);
      e.isNormalizing = false;
    }
  };

  e.apply = (op: Operation, shouldNormalize = true) => {
    e.shouldNormalize = shouldNormalize;
    if (op.type === "set_selection") {
      return apply(op);
    }

    const { from, shouldSave } = e;
    if (!shouldSave) {
      return apply(op);
    }
    const _lastBatch = e.history[e.history.length - 1] as Batch | undefined;
    const _lastOp = _lastBatch && _lastBatch.data[_lastBatch.data.length - 1];

    if (
      !from ||
      !_lastOp ||
      (from[0] === _lastOp[0] && from[1] === _lastOp[1])
    ) {
      //
    } else {
      e.history = HistoryEditor.giveTill(e, from);
    }

    const { operations, history, isNormalizing } = e;

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
    e.from = [
      e.history.length - 1,
      e.history[e.history.length - 1].data.length - 1,
    ];

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
