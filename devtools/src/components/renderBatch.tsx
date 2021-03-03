import { useToggleOnClick } from "../hooks/useToggleOnClick";
import { Batch } from "../util/historyEditor";
import React from "react";
import { RenderOperations } from "./renderOperations";
import { Location } from "slate";

type Props = {
  batch: Batch;
  from: [number, number] | undefined;
  setFrom: (value: [number, number]) => void;
  num: number;
};

export const RenderBatch = ({ batch, from, setFrom, num }: Props) => {
  const [showOperations, onClick] = useToggleOnClick<HTMLButtonElement>(false);

  return (
    <div className="flex flex-col gap-y-2 ">
      <button
        onClick={onClick}
        className={`${
          batch.normalizing ? "bg-indigo-500" : "bg-purple-900"
        } text-sm p-2 rounded-lg`}
      >
        {batch.normalizing ? "Normalizing" : "Operation"}
      </button>
      {showOperations ? (
        <div className="flex flex-col gap-y-2">
          {batch.data.map((op, i) => {
            return (
              <RenderOperations
                op={op}
                key={`${batch.id}_${i}`}
                from={from}
                setFrom={setFrom}
                to={[num, i]}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
