import { atom, useAtom } from "jotai";

/**
 * updateApp stores weather the button `Update app` is "on" or "off"
 *
 */

const updateAppAtom = atom<"on" | "off">("off");

const updateAppAtomRead = atom((get) => get(updateAppAtom));

const updateAppAtomSet = atom(null, (get, set, by: "on" | "off") =>
  set(updateAppAtom, by)
);

export const useUpdateApp = () => {
  return useAtom(updateAppAtom);
};

export const useUpdateAppRead = () => {
  return useAtom(updateAppAtomRead);
};

export const useUpdateAppSet = () => {
  return useAtom(updateAppAtomSet);
};
