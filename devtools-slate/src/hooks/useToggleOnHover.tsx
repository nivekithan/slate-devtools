import { useState } from "react";
import { ReactEditor } from "slate-react";

export const useToggleOnHover = <T extends HTMLDivElement>(
  defaultState: boolean = false
): [
  boolean,
  (e: React.MouseEvent<T, MouseEvent>) => void,
  (e: React.MouseEvent<T, MouseEvent>) => void
] => {
  const [isState, setIsState] = useState<boolean>(defaultState);

  const onMouseOver = (e: React.MouseEvent<T, MouseEvent>) => {
    e.preventDefault();
    setIsState(true);
  };

  const onMouseOut = (e: React.MouseEvent<T, MouseEvent>) => {
    e.preventDefault();
    setIsState(false);
  };

  return [isState, onMouseOver, onMouseOut];
};
