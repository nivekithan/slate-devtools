import { Path } from "slate";
import React from "react";

export const RenderPath = ({ path }: { path: Path }) => {
  return (
    <div className="flex gap-x-1 items-center">
      <div className="text-blue-300 text-sm">{"["}</div>
      {path.map((value, i) => {
        return <div key={`${value}_${i}`} className="text-sm">{`${value},`}</div>;
      })}
      <div className="text-blue-300 text-sm">{"]"}</div>
    </div>
  );
};
