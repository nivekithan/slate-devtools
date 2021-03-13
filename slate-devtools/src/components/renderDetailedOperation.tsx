import { Operation } from "slate";
import React from "react";
import { Properties } from "./properties";
import { convertOperation } from "../util/convertOperation";
import { styled } from "../styles/stitches.config";

export type RenderDetailedOperationProps = {
  op: Operation;
};

export const RenderDetailedOperation = ({
  op,
}: RenderDetailedOperationProps) => {
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
    <StyledRenderDetailedOperation>
      <div>
        <div>{type.toUpperCase()}</div>
        {offset.renderOffset ? <div>Offset : {offset.offset} </div> : null}
        {position.renderPosition ? (
          <div>Position : {position.position} </div>
        ) : null}
      </div>
      <div>
        <Properties path={path} properties={properties} right={true} />
        {newProperties.renderNewProperties ? (
          <Properties
            path={newProperties.newPath}
            properties={newProperties.newProperties}
            left={true}
          />
        ) : null}
      </div>
    </StyledRenderDetailedOperation>
  );
};

const StyledRenderDetailedOperation = styled("div", {
  $reset: "",
  display: "flex",
  flexDirection: "column",
  rowGap: "0.75rem",

  "& > div": {
    $reset: "",

    "&:first-child": {
      display: "flex",
      fontSize: "0.875rem",
      columnGap: "0.75rem",
      fontWeight: 500,
      color: "$textOperationBlue",
    },

    "&:nth-child(2)": {
      display: "flex",
      columnGap: "0.75rem",
      justifyContent: "space-between",
    },
  },
});
