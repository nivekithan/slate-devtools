import React from "react";
import { InsertTextOperation } from "slate";
import { Properties } from "./properties";

type Props = {
  op: InsertTextOperation;
};

export const InsertText = ({ op }: Props) => {
  const { offset, path, text, type } = op;

  return (
    <div className="flex flex-col gap-y-3">
      <div className=" flex text-sm text-blue-200 font-semibold gap-x-3">
        <div>{type.toUpperCase()}</div>
        <div>Offset : {offset}</div>
      </div>
      <Properties path={path} properties={{ text }} right={true} />
    </div>
  );
};
