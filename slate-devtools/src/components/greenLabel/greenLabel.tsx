import React from "react";
import { styled } from "../../styles/stitches.config";

export type GreenLabelProps = {
  children: string;
};

export const GreenLabel = ({ children }: GreenLabelProps) => {
  return <StyledGreenLabel>{children}</StyledGreenLabel>;
};

export const StyledGreenLabel = styled("div", {
  $reset: "",
  fontWeight: 500,
  color: "#10b981",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
});
