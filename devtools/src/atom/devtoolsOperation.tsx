import { atom, useAtom } from "jotai";
import { Operation } from "slate";
import React from "react";

const devtoolsOperationsAtom = atom<Operation[]>([]);

const devtoolsOperationsAtomRead = atom((get) => get(devtoolsOperationsAtom));

export const useDevtoolsOperationsRead = () => {
  const atomValue = useAtom(devtoolsOperationsAtomRead);

  return atomValue;
};

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

export const useDevtoolsOperationsSet = () => {
  const atomValue = useAtom(devtoolsOperationsAtomSet);
  return atomValue;
};
