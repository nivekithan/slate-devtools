import React from "react";
import { Resizable as Re } from "re-resizable";

type Props = {
  children: React.ReactNode;
  width: string;
};

export const Resizable = ({ children, width }: Props) => {
  return (
    <div className="h-full relative">
      <Re
        className="overflow-auto border-gray-500"
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
          left: "bg-gray-500 border-l-2 pl-5px border-gray-500 ",
        }}
        handleStyles={{
          left: {
            width: "0px",
            left: "0px",
            backgroundColor: "inherit",
          },
        }}
      >
        {children}
      </Re>
    </div>
  );
};
