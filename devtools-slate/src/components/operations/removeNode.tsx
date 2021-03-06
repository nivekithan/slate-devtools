import React from "react";
import { RemoveNodeOperation } from "slate";
import { Properties } from "./properties";

type Props = {
  op: RemoveNodeOperation;
};

export const RemoveNode = ({ op }: Props) => {
  const { node, path, type } = op;

  return (
    <div className="flex flex-col gap-y-3">
      <div className="text-sm font-semibold text-blue-200">
        {type.toUpperCase()}
      </div>
      <Properties path={path} properties={node} right={true} />
    </div>
  );
};
