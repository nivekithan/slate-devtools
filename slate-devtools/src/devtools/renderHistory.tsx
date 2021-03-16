import { useDevEditorRead } from "../atom/devEditor";
import React from "react";
import { RenderBatch } from "../components/renderBatch";
import { Resizable } from "../components/resizable";
import { styled } from "../styles/stitches.config";

export const RenderHistory = () => {
  const [devEditor] = useDevEditorRead();

  const { history } = devEditor;

  // if (history.length === 0) {
  //   console.log()
  //   return <div></div>;
  // }

  return (
    <Resizable width="400px">
      <RenderHistoryStyled>
        {history.map((batch, i) => {
          return <RenderBatch key={batch.id} batch={batch} num={i} />;
        })}
      </RenderHistoryStyled>
    </Resizable>
  );
};

const RenderHistoryStyled = styled("div", {
  $reset: "",
  display: "flex",
  flexDirection: "column",
  rowGap: "0.5rem",
  fontSize: "0.75rem",
  borderRadius: "5px",
  width: "100%",
  padding: "1.25rem",
});
