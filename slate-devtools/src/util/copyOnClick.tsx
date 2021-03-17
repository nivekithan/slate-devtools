import React from "react";

/**
 * Returns a onClick function which when called will copy the given
 * data to clipboard
 */
export const copyOnClick = <T extends HTMLElement>(data: string) => {
  const onClick = (e: React.MouseEvent<T, MouseEvent>) => {
    e.preventDefault();
    navigator.clipboard.writeText(data);
  };

  return onClick;
};
