import { useRef } from "react";

export const useCallOnce = (callback: () => unknown) => {
  const firstTime = useRef<boolean>(true);

  return () => {
    if (firstTime.current) {
      callback();
      firstTime.current = false;
    }
  };
};
