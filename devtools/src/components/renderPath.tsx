import { Path } from "slate";
import React from "react";

export const RenderPath = ({ path }: { path: Path }) => {
  return (
    <div>
      <span>{"["}</span>
      {path.map((value, i) => {
        return <span key={`${value}_${i}`}>{`${value},`}</span>;
      })}
      <span>{"]"}</span>
    </div>
  );
};
