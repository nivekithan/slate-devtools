import { Operation } from "slate";
import React from "react";
import { HistoryEditor } from "../util/historyEditor";
import { useDevEditorRead } from "../atom/devEditor";
import { useToggleOnClick } from "../hooks/useToggleOnClick";
import { RenderFullOperation } from "./operations/renderFullOperation";

type Props = {
  op: Operation;
  to: [number, number];
};

export const RenderOperations = ({ op, to }: Props) => {
  const [devEditor] = useDevEditorRead();
  const { history } = devEditor;
  const { type, path } = op;
  const [showFullOperation, onClickShowOperation] = useToggleOnClick(false);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    HistoryEditor.apply(
      devEditor,
      devEditor.from || [
        history.length - 1,
        history[history.length - 1].data.length - 1,
      ],
      to
    );
    devEditor.from = to;
  };

  return (
    <div className="flex flex-col">
      <button
        className="bg-cyan-700 rounded text-xs flex justify-between p-1 items-center"
        onClick={onClickShowOperation}
      >
        <div>{type.toUpperCase()}</div>
        <a
          className="border-1 px-2 rounded border-indigo-500 bg-indigo-700 "
          onClick={onClick}
        >
          Here
        </a>
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
