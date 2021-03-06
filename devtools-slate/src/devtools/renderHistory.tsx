import { useDevEditorRead } from "../atom/devEditor";
import React, { useEffect, useRef, useState } from "react";
import { RenderOperations } from "../components/renderOperations";
import { RenderBatch } from "../components/renderBatch";
import { Resizer } from "re-resizable/lib/resizer";
import { Resizable } from "re-resizable";
import { Editor, Transforms } from "slate";

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
