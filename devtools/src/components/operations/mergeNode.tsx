import React from "react";
import { MergeNodeOperation } from "slate";
import { Properties } from "./properties";

type Props = {
  op: MergeNodeOperation;
};

export const MergeNode = ({ op }: Props) => {
  const { path, position, properties, type } = op;

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex text-sm text-blue-200 font-semibold gap-x-3">
        <div>{type.toUpperCase()}</div>
        <div>Position : {position}</div>
      </div>
      <Properties path={path} properties={properties} right={true} />
    </div>
  );
};
