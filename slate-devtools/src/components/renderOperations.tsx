import { Operation } from "slate";
import React from "react";
import { HistoryEditor } from "../util/historyEditor";
import { useDevEditorRead } from "../atom/devEditor";
import { useToggleOnClick } from "../hooks/useToggleOnClick";
import { RenderDetailedOperation } from "./renderDetailedOperation";
import { styled } from "../styles/stitches.config";
import { isArrayEqual } from "../util/isArrayEqual";

type Props = {
  op: Operation;
  to: [number, number];
};

export const RenderOperations = ({ op, to }: Props) => {
  const [devEditor] = useDevEditorRead();
  const { history } = devEditor;
  const { type, path } = op;
  const [showFullOperation, onClickShowOperation] = useToggleOnClick(false);
  const from = devEditor.from || [
    history.length - 1,
    history[history.length - 1].ops.length - 1,
  ];
  const isFromAndToSame = isArrayEqual(from, to);

  /**
   * When clicking here we call HistoryEditor.apply
   *
   * if devEditor.from is undefined then we will use lastOperation as from
   *
   * After that we will set devEditor.from to `to`
   */

  const onClickingHere = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    HistoryEditor.apply(devEditor, from, to);
    devEditor.from = to;
  };

  return (
    <StyledRenderOperation>
      <div>
        <button onClick={onClickingHere}>
          {isFromAndToSame ? "Current State" : "Here"}
        </button>
        <button onClick={onClickShowOperation}>
          <div>{type.toUpperCase()}</div>
          <div>{JSON.stringify(path)}</div>
        </button>
      </div>

      {showFullOperation ? (
        <div>
          <RenderDetailedOperation op={op} />
        </div>
      ) : null}
    </StyledRenderOperation>
  );
};

const StyledRenderOperation = styled("div", {
  $reset: "",
  display: "flex",
  flexDirection: "column",
  rowGap: "0.75rem",

  "& > div": {
    "&:first-child": {
      $reset: "",
      backgroundColor: "$buttonGreen",
      fontSize: "0.75rem",
      display: "flex",

      "& > button": {
        $reset: "",

        "&:first-child": {
          backgroundColor: "$operationHere",
          padding: "0px 5px",
        },
        "&:nth-child(2)": {
          flex: "1 1 0%",
          display: "flex",
          alignItems: "center",
          padding: "0.25rem",
          justifyContent: "space-between",
        },
      },
    },
  },
});
