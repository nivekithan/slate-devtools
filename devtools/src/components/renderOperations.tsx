import { Operation } from "slate";
import React, { useEffect } from "react";
import { HistoryEditor } from "../util/historyEditor";
import { useDevEditorRead } from "../atom/devEditor";
import { useToggleOnClick } from "../hooks/useToggleOnClick";
import { RenderFullOperation } from "./operations/renderFullOperation";

type Props = {
  op: Operation;
  from: [number, number] | undefined;
  setFrom: (value: [number, number]) => void;
  to: [number, number];
};

export const RenderOperations = ({ op, from, setFrom, to }: Props) => {
  const [devEditor] = useDevEditorRead();
  const { history } = devEditor;
  const { type, path } = op;

  const [showFullOperation, onClickShowOperation] = useToggleOnClick(false);

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    HistoryEditor.apply(
      devEditor,
      from || [history.length - 1, history[history.length - 1].data.length - 1],
      to
    );
    setFrom(to);
  };

  return (
    <div className="flex flex-col">
      <button
        className="bg-cyan-700 rounded text-xs flex justify-between p-1 items-center"
        onClick={onClickShowOperation}
      >
        <div>{type.toUpperCase()}</div>
        <button
          className="border-1 px-2 rounded border-indigo-500 bg-indigo-700 "
          onClick={onClick}
        >
          Here
        </button>
        <div>{JSON.stringify(path)}</div>
      </button>
      {showFullOperation ? (
        <div className="my-2">
          <RenderFullOperation op={op} />
        </div>
      ) : null}
    </div>
  );
};
