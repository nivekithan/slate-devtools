import { Operation } from "slate";
import React from "react";
import { HistoryEditor } from "../util/historyEditor";
import { useDevEditorRead } from "../atom/devEditor";
import { useToggleOnClick } from "../hooks/useToggleOnClick";
import { RenderDetailedOperation } from "./renderDetailedOperation";
import { styled } from "../styles/stitches.config";

type Props = {
  op: Operation;
  to: [number, number];
};

export const RenderOperations = ({ op, to }: Props) => {
  const [devEditor] = useDevEditorRead();
  const { history } = devEditor;
  const { type, path } = op;
  const [showFullOperation, onClickShowOperation] = useToggleOnClick(false);

  /**
   * When clicking here we call HistoryEditor.apply
   *
   * if devEditor.from is undefined then we will use lastOperation as from
   *
   * After that we will set devEditor.from to `to`
   */

  const onClickingHere = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
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
    <StyledRenderOpeartion>
      <button onClick={onClickShowOperation}>
        <div>{type.toUpperCase()}</div>
        <a onClick={onClickingHere}>Here</a>
        <div>{JSON.stringify(path)}</div>
      </button>
      {showFullOperation ? (
        <div>
          <RenderDetailedOperation op={op} />
        </div>
      ) : null}
    </StyledRenderOpeartion>
  );
};

const StyledRenderOpeartion = styled("div", {
  $reset: "",
  display: "flex",
  flexDirection: "column",
  rowGap: "0.5rem",

  "& > button": {
    $reset: "",
    display: "grid",
    backgroundColor: "$buttonGreen",
    borderRadius: "5px",
    gridTemplateColumns: "5rem 1fr 4rem",
    fontSize: "0.75rem",
    padding: "0.25rem",

    "& > *": {
      $reset: "",

      "&:first-child": {
        justifySelf: "start",
      },

      "&:nth-child(2)": {
        justifySelf: "center",
        border: "1px",
        padding: "0 0.5rem",
        borderRadius: "3px",
        backgroundColor: "$operationHere",
      },

      "&:nth-child(3)": {
        justifySelf: "end",
      },
    },
  },
});
