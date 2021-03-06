import React, { useLayoutEffect, useRef, useState } from "react";
import { Transforms } from "slate";
import { useDevEditorRead } from "../atom/devEditor";
import { useSelectedPropertiesRead } from "../atom/selectedProperties";
import { InlineEdit } from "./inlineEdit";

/**
 * TODO:
 *
 * [ ] Have better feedback when JSON.parse throws error
 */

type Props = {
  keys: string;
  value: string;
};

export const SingleProperty = ({ keys, value }: Props) => {
  const [devEditor] = useDevEditorRead();
  const [{ path }] = useSelectedPropertiesRead();

  const [valueInputValue, setValueInputValue] = useState<string>(value);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const validValue = useRef<string>(value); // Stores previous valid Value

  const allowEdit = keys !== "children";

  /**
   * At first we will check if the current valueInputValue is same as  validValue if thats the case then we just off
   * the editing without applying any operation
   *
   * Then JSON.parse the value if the value is not of valid type we will set the valueInputValue
   * to validValue and off the editing
   *
   * Since Transformers.setNodes wont support text and children we have to use Transfromes.insertText for editing text fields
   * and for everything else we will just use Transfromes.setNodes and then update the validValue.
   *
   * The path at which these operations will apply will be path we get from selectedProperties
   */

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    try {
      if (valueInputValue !== validValue.current) {
        const parsedValue = JSON.parse(valueInputValue);

        if (keys === "text") {
          Transforms.insertText(devEditor, parsedValue, { at: path });
        } else {
          Transforms.setNodes(devEditor, { [keys]: parsedValue }, { at: path });
        }
        setIsEditing(false);
        validValue.current = valueInputValue;
      } else {
        setIsEditing(false);
      }
    } catch (err) {
      e.preventDefault();
      setValueInputValue(validValue.current);
      setIsEditing(false);
    }
  };
  1;
  /**
   * Change to editing mode when someone clicks on component
   */

  const onSpanClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();
    setIsEditing(true);
  };

  /**
   * Update the value of Input
   */

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValueInputValue(e.currentTarget.value);
  };

  /**
   * Remove the property when someone clicks the X
   */

  const onRemoveClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    Transforms.unsetNodes(devEditor, keys, { at: path });
  };

  /**
   * IF the value  changes outside of this component (like due to Transfromes.setNodes) we will update
   * that value to valueInputValue
   */

  useLayoutEffect(() => {
    setValueInputValue(value);
  }, [value]);

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
          <span>{valueInputValue}</span>
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
