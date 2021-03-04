import { Node, Path, SetNodeOperation } from "slate";
import React from "react";
import { Resizable } from "re-resizable";

type Props = {
  properties: Partial<Node>;
  path: Path;
  left?: boolean;
  right?: boolean;
};

export const Properties = ({
  properties,
  path,
  left = false,
  right = false,
}: Props) => {
  return (
    <Resizable
      className="border-1 inline-flex rounded-xl h-full"
      defaultSize={{ width: "120px", height: "auto" }}
      maxWidth="100%"
      enable={{ left, right }}
    >
      <div className="inline-flex flex-col w-full gap-y-1   items-center p-2 ">
        <div className="text-green-500 font-semibold text-sm ">
          Path : {JSON.stringify(path)}
        </div>
        <div className="flex flex-col gap-y-1 w-full  text-xs ">
          {Object.keys(properties).map((val, i) => {
            return (
              <div className="flex gap-x-1 " key={i}>
                <div className="truncate">{val} </div>
                <div>:</div>
                <div className="truncate">
                  {JSON.stringify(properties[val])}{" "}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Resizable>
  );
};
