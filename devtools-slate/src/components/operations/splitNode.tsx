import React from "react";
import { SplitNodeOperation } from "slate";
import { Properties } from "./properties";

type Props = {
  op: SplitNodeOperation;
};

export const SplitNode = ({ op }: Props) => {
  const { path, position, properties, type } = op;

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex gap-x-3 text-sm text-blue-200 font-semibold">
        <div>{type.toUpperCase()}</div>
        <div>Postion : {position}</div>
      </div>
      <Properties path={path} properties={properties} right={true} />
    </div>
  );
};
