import { Operation } from "slate";
import React from "react";
import { Properties } from "./properties";
import { convertOperation } from "../util/convertOperation";

type Props = {
  op: Operation;
};

export const RenderDetailedOperation = ({ op }: Props) => {
  /**
   * Since typescript does not support narrowing after one level of propagation
   * we cannot destructure the newProperties, offset and position
   *
   * See this issue for more information
   * https://github.com/microsoft/TypeScript/issues/12184#issuecomment-260162839
   *
   */

  const {
    newProperties,
    oldProperties: [properties, path],
    offset,
    position,
    type,
  } = convertOperation(op);

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex text-sm text-blue-200 font-semibold gap-x-3">
        <div>{type.toUpperCase()}</div>
        {offset.renderOffset ? <div>Offset : {offset.offset} </div> : null}
        {position.renderPosition ? (
          <div>Position : {position.position} </div>
        ) : null}
      </div>
      <div className="flex gap-x-3 justify-between">
        <Properties path={path} properties={properties} right={true} />
        {newProperties.renderNewProperties ? (
          <Properties
            path={newProperties.newPath}
            properties={newProperties.newProperties}
            left={true}
          />
        ) : null}
      </div>
    </div>
  );
};
