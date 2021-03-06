import React, { useState } from "react";
import { Editor } from "slate";
import { useDevEditorRead } from "../atom/devEditor";
import { exceute } from "../util/excecute";

type Props = {
  module: {
    [index: string]: unknown;
  };
  editor: Editor;
};

export const ScriptEditor = ({ module, editor }: Props) => {
  const [codeValue, setCodeValue] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [devEditor] = useDevEditorRead();

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setCodeValue(e.currentTarget.value);
  };

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
          onChange={onChange}
          className="w-full  bg-hex-111219 py-2 px-1 rounded"
          placeholder="Javascript Code"
        />
        <input
          type="submit"
          className="px-3 py-1 bg-blue-500 rounded-lg m-3 self-start  cursor-pointer "
          value="Run"
        />
      </form>
      <div className="text-red-500 text-xs px-3 py-1">
        {
          isError ? "There is something wrong with the code you write check the console for more information" : " "
        }
      </div>
    </div>
  );
};
