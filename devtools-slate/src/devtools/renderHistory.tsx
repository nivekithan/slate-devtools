import { useDevEditorRead } from "../atom/devEditor";
import React from "react";
import { RenderBatch } from "../components/renderBatch";

export const RenderHistory = () => {
  const [devEditor] = useDevEditorRead();

  const { history } = devEditor;

  if (history.length === 0) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col gap-y-2 text-xs w-full">
      {history.map((batch, i) => {
        return <RenderBatch key={batch.id} batch={batch} num={i} />;
      })}
    </div>
  );
};
