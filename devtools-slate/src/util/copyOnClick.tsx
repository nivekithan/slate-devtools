import React from "react";

export const copyOnClick = <T extends HTMLElement>(data: string) => {
  const onClick = (e: React.MouseEvent<T, MouseEvent>) => {
    e.preventDefault();
    navigator.clipboard.writeText(data);
  };

  return onClick;
};
