import { Operation } from "slate";
/**
 * Given an array of Operation it will return an array of Operation that you have to
 * apply inorder to reverse the effect done by the given Operations
 */

export const inverseOperations = (operations: Operation[]) => {
  /**
   * Operation.inverse returns an operation that inverses the given operation
   * to inverse an array of operations we have to start from bottom not from top thats why
   * we have to reverse the operations
   */

  const reverseOp = operations.reverse();

  const inverseOperations: Operation[] = [];

  reverseOp.forEach((op) => {
    inverseOperations.push(Operation.inverse(op));
  });
  return inverseOperations;
};
