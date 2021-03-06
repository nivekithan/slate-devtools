import { Operation } from "slate";

export const addOperations = (
  ref: { current: Operation[] },
  operations: Operation[]
) => {
  const { current } = ref;

  for (const operation of operations) {
    if (operation.type === "set_selection") {
      continue;
    }

    current.push(operation);
  }

  return current;
};
