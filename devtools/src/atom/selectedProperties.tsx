import { atom, useAtom } from "jotai";
import { Node, Path } from "slate";

type SelectedProperties = {
  node: Node;
  path: Path;
};

const selectedPropertiesAtom = atom<SelectedProperties>({
  node: { children: [] },
  path: [],
});

export const useSelectedProperties = () => {
  const atomValue = useAtom(selectedPropertiesAtom);
  return atomValue;
};

const selectedPropertiesAtomRead = atom((get) => get(selectedPropertiesAtom));

export const useSelectedPropertiesRead = () => {
  const readOnlyAtomValue = useAtom(selectedPropertiesAtomRead);

  return readOnlyAtomValue;
};
