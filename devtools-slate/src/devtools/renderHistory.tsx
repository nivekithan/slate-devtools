import { useDevEditorRead } from "../atom/devEditor";
import React from "react";
import { RenderBatch } from "../components/renderBatch";
import { Resizable } from "../components/resizable";

export const RenderHistory = () => {
  const [devEditor] = useDevEditorRead();

  const { history } = devEditor;

  if (history.length === 0) {
    return <div></div>;
  }

  return (
    <Resizable width="400px">
      <div className="flex flex-col gap-y-2 text-xs rounded w-full bg-hex-272535 p-5">
        {history.map((batch, i) => {
          return <RenderBatch key={batch.id} batch={batch} num={i} />;
        })}
      </div>
    </Resizable>
  );
};
