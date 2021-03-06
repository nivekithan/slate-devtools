import { atom, useAtom } from "jotai";

const updateDevToolsAtom = atom<"on" | "off">("off");

const updateDevToolsAtomRead = atom((get) => get(updateDevToolsAtom));

const updateDevToolsAtomSet = atom(null, (get, set, by: "on" | "off") =>
  set(updateDevToolsAtom, by)
);

export const useUpdateDevtools = () => {
  const atomValue = useAtom(updateDevToolsAtom);
  return atomValue;
};

export const useUpdateDevToolsRead = () => {
  const atomValue = useAtom(updateDevToolsAtomRead);

  return atomValue;
};

export const useUpdateDevToolsSet = () => {
  const atomValue = useAtom(updateDevToolsAtomSet);

  return atomValue;
};
