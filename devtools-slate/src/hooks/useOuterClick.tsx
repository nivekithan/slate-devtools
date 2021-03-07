import { useEffect, useRef } from "react";

type Callback = (e: MouseEvent) => void;

/**
 * Run a function when mouse clicks outside of an element
 */
export const useOuterClick = <T extends HTMLElement>(callback: Callback) => {
  const ref = useRef<T>(null);

  const onClickOutside = (e: MouseEvent) => {
    const targelElement = ref.current;
    if (!targelElement) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!targelElement.contains(e.target as any)) {
      callback(e);
    } else {
      return;
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  });
  return ref;
};
