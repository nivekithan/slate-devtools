import React from "react";
import { RemoveTextOperation } from "slate";
import { Properties } from "./properties";

type Props = {
  op: RemoveTextOperation;
};

export const RemoveText = ({ op }: Props) => {
  const { offset, path, text, type } = op;

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex gap-x-3 text-sm text-blue-200 font-semibold">
        <div>{type.toUpperCase()}</div>
        <div>Offset : {offset}</div>
      </div>
      <div>
        <Properties path={path} properties={{ text }} right={true} />
      </div>
    </div>
  );
};
