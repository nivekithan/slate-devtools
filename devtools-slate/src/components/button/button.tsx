/* eslint-disable react/display-name */
import React from "react";
import { styled } from "../../styles/stitches.config";

export type ButtonProps = {
  children: string;
  color: "gray" | "red" | "rose" | "blue";
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  // eslint-disable-next-line react/prop-types
  ({ children, color, onClick }, ref) => {
    return (
      <StyledButton onClick={onClick} color={color} ref={ref}>
        {children}
      </StyledButton>
    );
  }
);

export const StyledButton = styled("button", {
  $reset: "",
  $gridCenter: "",
  padding: "0.25rem 0.75rem",
  fontWeight: 500,
  color: "white",
  borderRadius: "0.25rem",
  fontSize: "0.75rem",
  lineHeight: "1rem",
  cursor: "pointer",
  variants: {
    color: {
      gray: {
        backgroundColor: "#4B5563",
        cursor: "default",
      },
      rose: {
        backgroundColor: "#e11d48",
        ":hover": {
          backgroundColor: "#f43f5e",
        },
      },
      blue: {
        backgroundColor: "#2563eb",
        ":hover": {
          backgroundColor: "#3b82f6",
        },
      },
      red: {
        backgroundColor: "#dc2626",
        ":hover": { backgroundColor: "#ef4444" },
      },
    },
  },
});
