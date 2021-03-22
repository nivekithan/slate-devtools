import { nanoid } from "nanoid";
import { Editor, Operation } from "slate";
import { ReactEditor } from "slate-react";
import { shouldMerge } from "../plugins";
import { DevtoolsEditor } from "../plugins/withDevtools";
import { DTOperation } from "./DTOperation";
import { HistoryEditor } from "./historyEditor";

export type BatchOptions = {
  normalizing?: boolean;
  location?: "Devtools" | "App";
};

export class Batch {
  readonly normalizing: boolean;
  readonly ops: DTOperation<Operation>[];
  readonly id: string;
  readonly location: "Devtools" | "App";

  constructor(ops: DTOperation<Operation>[], options: BatchOptions = {}) {
    const { normalizing = false, location = "Devtools" } = options;
    this.ops = ops;
    this.normalizing = normalizing;
    this.location = location;
    this.id = nanoid();
  }

  static addOperationsToBatches(
    current: Batch[],
    value: { op: Operation; normalizing: boolean }[]
  ) {
    if (value.length === 0) {
      return current;
    }

    for (let i = 0; i < value.length; i++) {
      const oldOp = value[i];
      const normalizing = oldOp.normalizing;
      const op = new DTOperation(oldOp.op);
      const lastBatch = current[current.length - 1] as undefined | Batch;
      const lastOp = lastBatch && lastBatch.ops[lastBatch.ops.length - 1];
      let merge = true;

      if (
        (!shouldMerge(op.operation, lastOp?.operation) && i === 0) ||
        lastBatch?.normalizing !== normalizing
      ) {
        merge = false;
      }
      if (lastBatch && merge) {
        lastBatch.ops.push(op);
      } else {
        const newBatch = new Batch([op], { location: "App", normalizing });

        if (newBatch.ops.length !== 0) {
          current.push(newBatch);
        }
      }
    }

    return current;
  }

  static inverseOperations(current: Batch[]) {
    const reverse = current.reverse();
    const operations: DTOperation<Operation>[] = [];

    for (const batch of reverse) {
      operations.push(...DTOperation.inverseOperations(batch.ops));
    }

    return operations;
  }

  static applyOperations(
    current: Batch[],
    editor: (ReactEditor & DevtoolsEditor) | (ReactEditor & HistoryEditor)
  ) {
    Editor.withoutNormalizing(editor, () => {
      current.forEach((batch) => {
        editor.isNormalizing = batch.normalizing;
        batch.ops.forEach((op, i) => {
          if (i === 0) {
            editor.dontMerge = true;
          } else {
            editor.dontMerge = false;
          }

          op.apply(editor, { location: batch.location });
        });
      });
    });
  }
}
