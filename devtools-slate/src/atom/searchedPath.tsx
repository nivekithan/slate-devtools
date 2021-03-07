import { atom, useAtom } from "jotai";
import { Node, Path } from "slate";

/**
 * SearchedProperties hold result from `search by path`
 */

type SearchedProperties = {
  node: Node;
  path: Path;
};

const searchedPropertiesAtom = atom<SearchedProperties>({
  node: { children: [] },
  path: [],
});

const searchedPropertiesAtomSet = atom(
  null,
  (get, set, by: SearchedProperties) => {
    set(searchedPropertiesAtom, by);
  }
);

export const useSearchedProperties = () => {
  return useAtom(searchedPropertiesAtom);
};

export const useSearchedPropertiesSet = () => {
  return useAtom(searchedPropertiesAtomSet);
};
