import React, { useState } from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";
import { Transforms } from "slate";
import { useDevEditorRead } from "../atom/devEditor";
import { useSelectedPropertiesRead } from "../atom/selectedProperties";
import { Button, InputSubmit } from "./button";
import { useFormInputs } from "../hooks/useFormInputs";

/**
 * TODO:
 *
 *  [ ] Better Feedback for the error instead of just console.error
 *  [ ] Making the modal draggable anywhere
 *
 */

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  referenceElement: HTMLElement | null;
};

export const AddPropertiesModal = ({
  setShowModal,
  referenceElement,
}: Props) => {
  const [
    keyInputValue,
    onChangeUpdateKeyInput,
  ] = useFormInputs<HTMLInputElement>('""');
  const [
    valueInputValue,
    onChangeUpdateValueInput,
  ] = useFormInputs<HTMLInputElement>('""');
  const [devEditor] = useDevEditorRead();
  const [{ path }] = useSelectedPropertiesRead();

  const [
    addPropertiesModal,
    setaddPropertiesModal,
  ] = useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(
    referenceElement,
    addPropertiesModal
  );

  /**
   * onSubmit we will parse the keyInputValue and valueInputValue using JSON if either one of them is
   * not valid, JSON will throw error which we will catch and console.error that error.
   * In this case we wont close the modal
   *
   * If the typeof parsed keyInputValue is not string then we will throw another error.
   * In this case we wont close the modal
   *
   * If there is no error and parsedKeyValue is value but it is empty or contians only line-breaks or
   * white-space then we will just close the modal but not updating the devEditor
   *
   * If the key is either text or children we will throw the error which will be catched by our catch block. In this case
   * we wont close the modal
   *
   * If case is none of the above then we will update the devEditor with the object {[parsedKeyValue] : parsedValueValue} and the
   * path will be selectedPath which we get from useSelectedPropertiesRead() after that we will close the modal
   */

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const parsedKeyValue = JSON.parse(keyInputValue);
      const parsedValueValue = JSON.parse(valueInputValue);

      if (typeof parsedKeyValue !== "string") {
        throw new Error(
          `The key has to be string. Make sure to enclose the Input field in quotes. As of now the the typeof key is : ${typeof parsedKeyValue}`
        );
      }

      if (parsedKeyValue.trim() === "") {
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

  /**
   * When the cancel button has been clicked we will just close modal
   */

  const onCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setShowModal(false);
  };

  const inputClassName = "bg-hex-0F0F0F px-2 py-1 rounded";

  return createPortal(
    <div
      ref={setaddPropertiesModal}
      style={styles.popper}
      {...attributes.popper}
    >
      <div className="flex text-white bg-hex-282a36  shadow-normal p-2 text-sm">
        <form className="flex flex-col gap-y-3" onSubmit={onSubmit}>
          <div>Key : </div>
          <input
            className={inputClassName}
            placeholder="Enter the key"
            value={keyInputValue}
            onChange={onChangeUpdateKeyInput}
          />
          <div>Value : </div>
          <input
            placeholder="Enter the value"
            className={inputClassName}
            value={valueInputValue}
            onChange={onChangeUpdateValueInput}
          />
          <div className="flex gap-x-3">
            <InputSubmit color="blue">Add</InputSubmit>

            <Button color="red" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};
