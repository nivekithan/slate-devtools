import React from "react";
import { InsertNodeOperation } from "slate";
import { Properties } from "./properties";

type Props = {
  op: InsertNodeOperation;
};

export const InsertNodes = ({ op }: Props) => {
  const { type, node, path } = op;

  return (
    <div className="flex flex-col gap-y-3">
      <div className="text-sm font-bold text-blue-200">
        {type.toUpperCase()}
      </div>
      <Properties path={path} properties={node} right={true} />
    </div>
  );
};
