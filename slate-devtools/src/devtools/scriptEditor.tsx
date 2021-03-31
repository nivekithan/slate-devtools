import React from "react";
import { Editor } from "slate";
import { useDevEditorRead } from "../atom/devEditor";
import { useFormInputs } from "../hooks/useFormInputs";
import { execute } from "../util/execute";
import { InputSubmit } from "../components/button";
import { styled } from "../styles/stitches.config";

type Props = {
  module: {
    [index: string]: unknown;
  };
  editor: Editor;
};

export const ScriptEditor = ({ module, editor }: Props) => {
  const [
    codeValue,
    onChangeUpdateCode,
    setCodeValue,
  ] = useFormInputs<HTMLTextAreaElement>("");
  const [devEditor] = useDevEditorRead();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (execute(codeValue, module, editor, devEditor)) {
      setCodeValue("");
    }
  };

  return (
    <ScriptEditorStyled data-cy-component="ScriptEditor">
      <form onSubmit={onSubmit}>
        <textarea
          value={codeValue}
          onChange={onChangeUpdateCode}
          placeholder="Javascript Code"
        />
        <div>
          <InputSubmit color="blue">Run</InputSubmit>
        </div>
      </form>
    </ScriptEditorStyled>
  );
};

const ScriptEditorStyled = styled("div", {
  $reset: "",
  display: "flex",
  flexDirection: "column",
  fontSize: "0.75rem",

  "& > form": {
    $reset: "",
    display: "flex",
    backgroundColor: "$DTSbgScriptEditor",
    borderRadius: "2px",

    "& > textarea": {
      $reset: "",
      width: "100%",
      backgroundColor: "$DTSbgScriptEditor",
      padding: "0.5rem 0.25rem",
      borderRadius: "2px",
      resize: "none",

      "&:focus": {
        $focus: "",
      },
    },

    "& > div": {
      $reset: "",
      alignSelf: "flex-start",
      padding: "0.25rem 1rem",
    },
  },
});
