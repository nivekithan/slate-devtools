import React from "react";
import { CSSProperties } from "react";
import { styled } from "../../styles/stitches.config";

export type RoundButtonProps = {
  children: string;
  size: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  style?: CSSProperties;
};

export const RoundButton = ({
  size,
  children,
  onClick,
  style,
}: RoundButtonProps) => {
  return (
    <RoundButtonStyled
      css={{
        width: size,
        height: size,
        borderRadius: `calc(${size} / 2)`,
      }}
      onClick={onClick}
      style={style}
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
  backgroundColor: "$DTSbg",
  color: "white",
  display: "grid",
  placeItems: "center",
  fontSize: "0.75rem",
  cursor: "pointer",
});
