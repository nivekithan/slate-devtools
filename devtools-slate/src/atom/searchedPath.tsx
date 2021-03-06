import { atom, useAtom } from "jotai";
import { Node, Path } from "slate";

type SearchedProperties = {
  node: Node;
  path: Path;
};

const searchedPropertiesAtom = atom<SearchedProperties>({
  node: { children: [] },
  path: [],
});

export const useSearchedProperties = () => {
  const atomValue = useAtom(searchedPropertiesAtom);

  return atomValue;
};

const searchedPropertiesAtomSet = atom(
  null,
  (get, set, by: SearchedProperties) => {
    set(searchedPropertiesAtom, by);
  }
);

export const useSearchedPropertiesSet = () => {
  const atomValue = useAtom(searchedPropertiesAtomSet);

  return atomValue;
};
