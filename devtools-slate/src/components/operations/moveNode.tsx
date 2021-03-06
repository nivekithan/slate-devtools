import React from "react";
import { MoveNodeOperation } from "slate";
import { Properties } from "./properties";

type Props = {
  op: MoveNodeOperation;
};

export const MoveNode = ({ op }: Props) => {
  const { newPath, path, type } = op;

  return (
    <div className="flex flex-col gap-y-3">
      <div className="text-sm text-blue-200 font-semibold">
        {type.toUpperCase()}
      </div>
      <div className="flex justify-between">
        <Properties path={path} properties={{}} right={true} />
        <Properties path={newPath} properties={{}} left={true} />
      </div>
    </div>
  );
};
