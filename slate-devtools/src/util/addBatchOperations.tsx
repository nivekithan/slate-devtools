import { nanoid } from "nanoid";
import { Operation } from "slate";
import { addOperations } from "./addOperations";
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

  const newBatch: Batch = {
    normalizing,
    location,
    id: nanoid(),
    data: addOperations({ current: [] }, operations),
  };

  if (newBatch.data.length !== 0) {
    current.push(newBatch);
  }

  return current;
};
