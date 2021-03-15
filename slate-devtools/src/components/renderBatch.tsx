import { useToggleOnClick } from "../hooks/useToggleOnClick";
import { Batch } from "../util/historyEditor";
import React from "react";
import { RenderOperations } from "./renderOperations";
import { styled } from "../styles/stitches.config";

/**
 * RenderBatch renders each seperate batch in RenderHistory and based wheather batch.normalizing is true or not the colour
 * will differ
 *
 * TODO
 *
 * [ ] Differentiate between operations happened in devEdtior and operations happened in editor
 * [ ] Better managing keys of operations. As of now keys are working correctly but I am not sure weather its good practice
 *     to have supply keys like this
 */

export type RenderBranchProps = {
  batch: Batch;
  num: number;
};

export const RenderBatch = ({ batch, num }: RenderBranchProps) => {
  const [showOperations, onClick] = useToggleOnClick<HTMLButtonElement>(false);

  return (
    <StyledRenderBatch>
      <StyledBatchButton
        onClick={onClick}
        op={batch.normalizing ? "no" : "yes"}
      >
        {batch.location} {batch.normalizing ? "Normalizing" : "Operation"}
      </StyledBatchButton>
      {showOperations
        ? batch.data.map((op, i) => {
            return (
              <RenderOperations
                op={op}
                key={`${batch.id}_${i}`} // TODO: 2
                to={[num, i]}
              />
            );
          })
        : null}
    </StyledRenderBatch>
  );
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
