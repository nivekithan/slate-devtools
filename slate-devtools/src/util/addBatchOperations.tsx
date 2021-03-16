import { nanoid } from "nanoid";
import { Operation } from "slate";
import { shouldMerge } from "../plugins";
import { Batch } from "./historyEditor";

export const addBatchOperations = (
  ref: { current: Batch[] },
  operations: Operation[],
  options: {
    location?: "Devtools" | "App";
    normalizing?: boolean;
  } = {}
) => {
  const { current } = ref;
  const { location = "App", normalizing = false } = options;

  const filtredOperations = operations.filter(
    (op) => op.type !== "set_selection"
  );

  for (let i = 0; i < filtredOperations.length; i++) {
    const op = filtredOperations[i];
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
        data: [op],
        id: nanoid(),
        location,
        normalizing,
      };

      current.push(newBatch);
    }
  }

  return current;
};
