import React from "react";
import { Resizable as Re } from "re-resizable";
import { css } from "../styles/stitches.config";

type Props = {
  children: React.ReactNode;
  width: string;
};

export const Resizable = ({ children, width }: Props) => {
  return (
    <div
      className={css({ $reset: "", height: "100%", position: "relative" })()}
    >
      <Re
        className={css({
          $reset: "",
          overflow: "auto",
        })()}
        style={{ position: "static" }}
        defaultSize={{ width: width, height: "100%" }}
        enable={{
          left: true,
          right: false,
          bottom: false,
          bottomLeft: false,
          bottomRight: false,
          top: false,
          topLeft: false,
          topRight: false,
        }}
        handleClasses={{
          left: css({
            $reset: "",
            borderLeft: "2px solid $buttonGray",
            padding: "0px 4px",
          })(),
        }}
        handleStyles={{
          left: {
            left: "0px",
            backgroundColor: "inherit",
            width: "1px",
          },
        }}
      >
        {children}
      </Re>
    </div>
  );
};
