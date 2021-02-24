// Given an boolean

import { useState } from "react";

export const useToggleOnClick = <T extends HTMLElement>(
  defaultState: boolean
): [boolean, (e: React.MouseEvent<T, MouseEvent>) => void] => {
  const [isState, setIsState] = useState<boolean>(defaultState);

  const onClick = (e: React.MouseEvent<T, MouseEvent>) => {
    e.preventDefault();
    setIsState((s) => !s);
  };

  return [isState, onClick];
};
