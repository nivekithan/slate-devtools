import { atom, useAtom } from "jotai";
import { Node, Path } from "slate";

/**
 * selectedProperties stores result from either selecting a property from DevSlate or
 * after a valid serach from `serach by path`
 */

type SelectedProperties = {
  node: Node;
  path: Path;
};

const selectedPropertiesAtom = atom<SelectedProperties>({
  node: { children: [] },
  path: [],
});

const selectedPropertiesAtomRead = atom((get) => get(selectedPropertiesAtom));

export const useSelectedProperties = () => {
  return useAtom(selectedPropertiesAtom);
};

export const useSelectedPropertiesRead = () => {
  return useAtom(selectedPropertiesAtomRead);
};
