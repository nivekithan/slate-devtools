import { Operation } from "slate";
import { Batch } from "./historyEditor";
import { inverseOperations } from "./inverseOperations";

/**
 * Inverses the Operations from an of Batches
 *
 */

export const inverseBatchOperations = (batches: Batch[]) => {
  const reverseBatch = batches.reverse();

  const inverseOperation: Operation[] = [];

  reverseBatch.forEach((batch) => {
    inverseOperations(batch.data).forEach((op) => {
      inverseOperation.push(op);
    });
  });

  return inverseOperation;
};
