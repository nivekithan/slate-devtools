import { useRef } from "react";

/**
 * Return a function that can be called only once
 */
export const useCallOnce = (callback: () => unknown) => {
  const firstTime = useRef<boolean>(true);

  return () => {
    if (firstTime.current) {
      callback();
      firstTime.current = false;
    }
  };
};
