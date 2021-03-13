import { atom, useAtom } from "jotai";

/**
 * UpdateDevtools stores weather the button `Update devtools` is "on" or "off"
 */

const updateDevToolsAtom = atom<"on" | "off">("off");

const updateDevToolsAtomRead = atom((get) => get(updateDevToolsAtom));

const updateDevToolsAtomSet = atom(null, (get, set, by: "on" | "off") =>
  set(updateDevToolsAtom, by)
);

export const useUpdateDevtools = () => {
  return useAtom(updateDevToolsAtom);
};

export const useUpdateDevToolsRead = () => {
  return useAtom(updateDevToolsAtomRead);
};

export const useUpdateDevToolsSet = () => {
  return useAtom(updateDevToolsAtomSet);
};
