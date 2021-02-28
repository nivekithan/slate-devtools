import React, { useState } from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";
import { Transforms } from "slate";
import { useSelectedPropertiesRead } from "../atom/selectedProperties";
import { useDevEditor } from "../contexts/devEditor";

type Props = {
  ParentModal: ({ children }: { children: React.ReactNode }) => JSX.Element;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const inputClassName = "bg-hex-0F0F0F px-2 py-1 rounded";

export const AddPropertiesModal = ({ ParentModal, setShowModal }: Props) => {
  const [keyInputValue, setKeyInputValue] = useState<string>('""');
  const [valueInputValue, setValueInputValue] = useState<string>('""');
  const devEditor = useDevEditor();
  const [{ path }] = useSelectedPropertiesRead();

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: "keyInputValue" | "valueInputValue"
  ) => {
    e.preventDefault();
    if (name === "keyInputValue") {
      setKeyInputValue(e.currentTarget.value);
    } else {
      setValueInputValue(e.currentTarget.value);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const parsedKeyValue = JSON.parse(keyInputValue);
      const parsedValueValue = JSON.parse(valueInputValue);

      if (typeof parsedKeyValue === "string" && parsedKeyValue.trim() === "") {
        setShowModal(false);
      } else if (parsedKeyValue !== "text" && parsedKeyValue !== "children") {
        Transforms.setNodes(
          devEditor,
          { [parsedKeyValue]: parsedValueValue },
          { at: path }
        );
        setShowModal(false);
      } else {
        throw new Error("The Key cannot be text or children");
      }
    } catch (err) {
      if (err instanceof SyntaxError) {
        const syntaxErr = new Error(
          "The Syntax for key and value field should be JSON parseable. IF you want to insert different datatype not supported by jSON use scriptEditor to insert the data manually"
        );
        console.error(syntaxErr);
      }
      console.error(err);
    }
  };

  const onCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setShowModal(false);
  };

  return createPortal(
    <ParentModal>
      <div className="flex text-white bg-hex-282a36F shadow-normal p-2">
        <form className="flex flex-col gap-y-3" onSubmit={onSubmit}>
          <div>Key : </div>
          <input
            className={inputClassName}
            placeholder="Enter the key"
            value={keyInputValue}
            onChange={(e) => onChange(e, "keyInputValue")}
          />
          <div>Value : </div>
          <input
            placeholder="Enter the value"
            className={inputClassName}
            value={valueInputValue}
            onChange={(e) => onChange(e, "valueInputValue")}
          />
          <div className="flex gap-x-3">
            <input
              type="submit"
              value="Okay"
              className="bg-blue-600 rounded px-3 py-1   text-sm gird place-items-center cursor-pointer hover:bg-blue-500 "
            />
            <button
              className="text-red-400 text-sm hover:text-red-300"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </ParentModal>,
    document.body
  );
};
