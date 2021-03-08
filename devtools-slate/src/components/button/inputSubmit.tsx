import React from "react";
import { StyledButton } from "./button";

export type InputProps = {
  color: "blue" | "red" | "rose" | "gray";
  children: string;
};

export const InputSubmit = ({ color, children }: InputProps) => {
  return (
    <StyledButton as="input" type="submit" value={children} color={color} />
  );
};
