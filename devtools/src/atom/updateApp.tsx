import { atom, useAtom } from "jotai";

const updateAppAtom = atom<"on" | "off">("off");

const updateAppAtomRead = atom((get) => get(updateAppAtom));

const updateAppAtomSet = atom(null, (get, set, by: "on" | "off") =>
  set(updateAppAtom, by)
);

export const useUpdateApp = () => {
  const atomValue = useAtom(updateAppAtom);

  return atomValue;
};

export const useUpdateAppRead = () => {
  const atomValue = useAtom(updateAppAtomRead);

  return atomValue;
};

export const useUpdateAppSet = () => {
  const atomValue = useAtom(updateAppAtomSet);

  return atomValue;
};
