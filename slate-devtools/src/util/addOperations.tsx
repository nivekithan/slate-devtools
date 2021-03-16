import { Operation } from "slate";

/**
 * Given an ref whose value is Operation[] and operations : Operation[] to add,
 * it will return result Operations[] after adding
 */

export const addOperations = (
  ref: { current: Operation[] },
  operations: Operation[]
) => {
  const { current } = ref;

  operations.forEach((op) => {
    /**
     * We wont care about set_selection operation since they are pretty useless
     * for our usecase
     */

    if (op.type !== "set_selection") {
      current.push(op);
    }
  });

  return current;
};
