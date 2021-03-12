import React from "react";
import { Resizable as Re } from "re-resizable";
import { css } from "../styles/stitches.config";

type Props = {
  children: React.ReactNode;
  width: string;
};

export const Resizable = ({ children, width }: Props) => {
  return (
    <div className={ResizableHandleClassName}>
      <Re
        className={reClasName}
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
          left: leftHandleClass,
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

const ResizableHandleClassName = css({
  $reset: "",
  height: "100%",
  position: "relative",
})();

const reClasName = css({
  $reset: "",
  overflow: "auto",
})();

const leftHandleClass = css({
  $reset: "",
  borderLeft: "2px solid $buttonGray",
  padding: "0px 4px",
})();
