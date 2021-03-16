import { Operation } from "slate";
import { Batch } from "./historyEditor";
import { inverseOperations } from "./inverseOperations";

export const inverseBatchOperations = (batches: Batch[]) => {
  const reverseBatch = batches.reverse();

  const operations: Operation[] = [];

  for (const batch of reverseBatch) {
    const inverseOperation = inverseOperations(batch.data);
    operations.push(...inverseOperation);
  }

  return operations;
};
