import { nanoid } from "nanoid";
import { Operation } from "slate";
import { shouldMerge } from "../plugins";
import { Batch } from "./historyEditor";

/**
 * Adds group of operations as Batch Operation
 */

export const addBatchOperations = (
  ref: { current: Batch[] },
  operations: Operation[],
  options: {
    normalizing?: boolean;
    location?: "App" | "Devtools";
  } = {}
) => {
  const { normalizing = false, location = "Devtools" } = options;
  const { current } = ref;
  const filteredOperation = operations.filter(
    (op) => op.type !== "set_selection"
  );

  for (let i = 0; i < filteredOperation.length; i++) {
    const op = filteredOperation[i];
    const lastBatch = current[current.length - 1] as Batch | undefined;
    const lastOp = lastBatch && lastBatch.data[lastBatch.data.length - 1];
    let merge = false;

    if (shouldMerge(op, lastOp)) {
      merge = true;
    } else if (i === 0) {
      merge = false;
    } else {
      merge = true;
    }

    if (lastBatch && merge) {
      lastBatch.data.push(op);
    } else {
      const newBatch: Batch = {
        normalizing,
        location,
        id: nanoid(),
        data: [op],
      };

      current.push(newBatch);
    }
  }
  return current;
};
