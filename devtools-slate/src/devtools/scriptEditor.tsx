import React, { useState } from "react";
import { Editor } from "slate";
import { useDevEditorRead } from "../atom/devEditor";
import { useFormInputs } from "../hooks/useFormInputs";
import { exceute } from "../util/excecute";
import { InputSubmit } from "../components/button";

type Props = {
  module: {
    [index: string]: unknown;
  };
  editor: Editor;
};

export const ScriptEditor = ({ module, editor }: Props) => {
  const [codeValue, onChangeUpdateCode] = useFormInputs<HTMLTextAreaElement>(
    ""
  );
  const [isError, setIsError] = useState<boolean>(false);
  const [devEditor] = useDevEditorRead();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (exceute(codeValue, module, editor, devEditor)) {
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  return (
    <div className="flex flex-col text-xs">
      <form onSubmit={onSubmit} className="flex bg-hex-111219 rounded">
        <textarea
          value={codeValue}
          onChange={onChangeUpdateCode}
          className="w-full  bg-hex-111219 py-2 px-1 rounded"
          placeholder="Javascript Code"
        />
        <div style={{ alignSelf: "flex-start", padding: "0.25rem 1rem" }}>
          <InputSubmit color="blue">Run</InputSubmit>
        </div>
      </form>
    </div>
  );
};
