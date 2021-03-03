import { Operation } from "slate";
import React, { useEffect } from "react";
import { HistoryEditor } from "../util/historyEditor";
import { useDevEditorRead } from "../atom/devEditor";

type Props = {
  op: Operation;
  from: [number, number] | undefined;
  setFrom: (value: [number, number]) => void;
  to: [number, number];
};

export const RenderOperations = ({ op, from, setFrom, to }: Props) => {
  const [devEditor] = useDevEditorRead();
  const {history} = devEditor;


  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    HistoryEditor.apply(
      devEditor,
      from || [
        history.length - 1,
        history[history.length - 1].data.length - 1,
      ],
      to
    );
    setFrom(to);
  };

  return (
    <button
      className="p-1 bg-cyan-700 rounded text-xs truncate"
      onClick={onClick}
    >
      {JSON.stringify(op)}
    </button>
  );
};
