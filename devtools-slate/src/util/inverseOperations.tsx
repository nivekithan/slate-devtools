import { Operation } from "slate";

export const inverseOperations = (operations: Operation[]) => {
  const reverseOp = operations.reverse();

  const inverseOperations: Operation[] = [];

  for (const operation of reverseOp) {
    inverseOperations.push(Operation.inverse(operation));
  }

  return inverseOperations;
};
