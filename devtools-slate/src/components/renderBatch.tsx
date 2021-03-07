import { useToggleOnClick } from "../hooks/useToggleOnClick";
import { Batch } from "../util/historyEditor";
import React from "react";
import { RenderOperations } from "./renderOperations";

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

type Props = {
  batch: Batch;
  num: number;
};

export const RenderBatch = ({ batch, num }: Props) => {
  const [showOperations, onClick] = useToggleOnClick<HTMLButtonElement>(false);

  return (
    <div className="flex flex-col gap-y-2 text-xs">
      <button
        onClick={onClick}
        className={`${
          batch.normalizing ? "bg-indigo-500" : "bg-purple-900"
        }  p-2 rounded-lg`}
      >
        {batch.normalizing ? "Normalizing" : "Operation"}
      </button>
      {showOperations ? (
        <div className="flex flex-col gap-y-2 ">
          {batch.data.map((op, i) => {
            return (
              <RenderOperations
                op={op}
                key={`${batch.id}_${i}`} // TODO: 2
                to={[num, i]}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
