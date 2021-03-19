import { useToggleOnClick } from "../hooks/useToggleOnClick";
import React from "react";
import { RenderOperations } from "./renderOperations";
import { styled } from "../styles/stitches.config";
import { Batch } from "../util/batch";

/**
 * RenderBatch renders each separate batch in RenderHistory and based weather batch.normalizing is true or not the colour
 * will differ
 *

 */

export type RenderBranchProps = {
  batch: Batch;
  num: number;
};

export const RenderBatch = ({ batch, num }: RenderBranchProps) => {
  const [showOperations, onClick] = useToggleOnClick<HTMLButtonElement>(false);

  /**
   * We wont show the Devtools Normalizing operations since they are not
   * useful to user
   */

  return !(batch.normalizing && batch.location === "Devtools") ? (
    <StyledRenderBatch>
      <StyledBatchButton
        onClick={onClick}
        op={batch.normalizing ? "no" : "yes"}
        data-cy-he-batch={`${batch.location} ${
          batch.normalizing ? "Normalizing" : "Operation"
        }`}
      >
        {batch.location} {batch.normalizing ? "Normalizing" : "Operation"}
      </StyledBatchButton>
      {showOperations
        ? batch.ops.map((op, i) => {
            return (
              <RenderOperations
                op={op.operation}
                key={`${op.id}`}
                to={[num, i]}
              />
            );
          })
        : null}
    </StyledRenderBatch>
  ) : null;
};

const StyledBatchButton = styled("button", {
  $reset: "",
  cursor: "pointer",
  variants: {
    op: {
      yes: {
        backgroundColor: "$batchOperations",
      },
      no: {
        backgroundColor: "$batchNormalizing",
      },
    },
  },
});

const StyledRenderBatch = styled("div", {
  $reset: "",
  display: "flex",
  flexDirection: "column",
  rowGap: "0.5rem",
  fontSize: "0.75rem",

  "& > button": {
    padding: "0.5rem",
    borderRadius: "5px",
  },
});
