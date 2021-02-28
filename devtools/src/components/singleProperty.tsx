import React, { useRef, useState } from "react";
import { Node, Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { useDevEditorRead } from "../atom/devEditor";
import { useSelectedPropertiesRead } from "../atom/selectedProperties";
import { InlineEdit } from "./inlineEdit";

type Props = {
  keys: string;
  value: string;
};

export const SingleProperty = ({ keys, value }: Props) => {
  const [devEditor] = useDevEditorRead();
  const [{ path }] = useSelectedPropertiesRead()
  const [valueInputValue, setValueInputValue] = useState<string>(value);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const validValue = useRef<string>(value);

  const allowEdit = keys !== "children";

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    try {
      const parsedValue = JSON.parse(valueInputValue);
      if (keys === "text") {
        Transforms.insertText(devEditor, parsedValue, { at: path });
      } else {
        Transforms.setNodes(devEditor, { [keys]: parsedValue }, { at: path });
      }
      setIsEditing(false);
      validValue.current = valueInputValue;
    } catch (err) {
      e.preventDefault();
      setValueInputValue(validValue.current);
      setIsEditing(false);
    }
  };

  const onSpanClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValueInputValue(e.currentTarget.value);
  };

  const onRemoveClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    Transforms.unsetNodes(devEditor, keys, { at: path });
  };

  return (
    <div className="flex gap-x-3">
      <div className="w-100px truncate text-blue-500">{keys}</div>
      <div>:</div>
      <div className="w-200px truncate">
        {allowEdit ? (
          <InlineEdit
            value={valueInputValue}
            onChange={onInputChange}
            onBlur={onBlur}
            isEditing={isEditing}
            spanProps={{ onClick: onSpanClick }}
          />
        ) : (
          <span>{value}</span>
        )}
      </div>
      {allowEdit && keys !== "text" ? (
        <button className="text-red-400 pl-2" onClick={onRemoveClick}>
          X
        </button>
      ) : null}
    </div>
  );
};
