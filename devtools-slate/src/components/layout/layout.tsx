import React from "react";
import { styled } from "../../styles/stitches.config";
import { StyledLayout } from "./styledLayout";

type LayoutProps = {
  children: React.ReactNode;
  show: "yes" | "no";
  height: string;
};

export const Layout = ({ children, show, height }: LayoutProps) => {
  return (
    <TopLayout show={show}>
      <StyledLayout style={{ height: height }}>{children}</StyledLayout>
    </TopLayout>
  );
};

const TopLayout = styled("div", {
  $reset: "",
  position: "fixed",
  backgroundColor: "$bg",
  variants: {
    show: {
      yes: {
        right: "0px",
        left: "0px",
        bottom: "0px",
      },
      no: {
        marginLeft: "-100000px",
      },
    },
  },
});
