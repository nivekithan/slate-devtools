import React from "react";
import { SetNodeOperation } from "slate";
import { Properties } from "./properties";

type Props = {
  op: SetNodeOperation;
};

export const SetNode = ({ op }: Props) => {
  const { newProperties, properties, path, type } = op;

  return (
    <div className="flex flex-col gap-y-3">
      <div className="text-sm text-blue-200 font-semibold">
        {type.toUpperCase()}
      </div>
      <div className="flex gap-x-3 justify-between">
        <Properties properties={properties} path={path} right={true} />
        <Properties properties={newProperties} path={path} left={true} />
      </div>
    </div>
  );
};
