import React from "react";
import { styled } from "../../styles/stitches.config";

export type RoundButtonProps = {
  children: string;
  size: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const RoundButton = ({ size, children, onClick }: RoundButtonProps) => {
  return (
    <RoundButtonStyled
      css={{
        width: size,
        height: size,
        borderRadius: `calc(${size} / 2)`,
      }}
      onClick={onClick}
    >
      {children}
    </RoundButtonStyled>
  );
};

const RoundButtonStyled = styled("button", {
  $reset: "",
  position: "fixed",
  left: "0px",
  bottom: "0px",
  marginLeft: "1.25rem",
  marginBottom: "1.25rem",
  backgroundColor: "$bg",
  color: "white",
  display: "grid",
  placeItems: "center",
  fontSize: "0.75rem",
  cursor: "pointer",
});
