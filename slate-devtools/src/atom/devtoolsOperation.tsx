import { atom, useAtom } from "jotai";
import { Operation } from "slate";

/**
 * devtoolsOperation stores operation applied to devEditor
 */

const devtoolsOperationsAtom = atom<Operation[]>([]);

const devtoolsOperationsAtomRead = atom((get) => get(devtoolsOperationsAtom));

type ByActions =
  | {
      type: "push";
      data: Operation;
    }
  | {
      type: "clear";
    };

const devtoolsOperationsAtomSet = atom(null, (get, set, by: ByActions) => {
  const operation = get(devtoolsOperationsAtom);

  switch (by.type) {
    case "push":
      operation.push(by.data);
      set(devtoolsOperationsAtom, operation);
      break;
    case "clear":
      set(devtoolsOperationsAtom, []);
  }
});

export const useDevtoolsOperationsRead = () => {
  return useAtom(devtoolsOperationsAtomRead);
};

export const useDevtoolsOperationsSet = () => {
  return useAtom(devtoolsOperationsAtomSet);
};
