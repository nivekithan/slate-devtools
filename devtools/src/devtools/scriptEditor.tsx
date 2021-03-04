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
    <div className="flex flex-col">
      <form onSubmit={onSubmit} className="flex bg-hex-111219 rounded-3xl">
        <textarea
          value={codeValue}
          onChange={onChange}
          className="w-full h-100px bg-hex-111219 p-5 rounded-3xl"
          placeholder="Javascript Code"
        />
        <input
          type="submit"
          className="p-2 bg-blue-500 rounded m-3 self-start text-sm cursor-pointer "
          value="submit"
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
