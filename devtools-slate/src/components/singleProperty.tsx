import React, { Fragment, useLayoutEffect, useRef } from "react";
import { Transforms } from "slate";
import { useDevEditorRead } from "../atom/devEditor";
import { useSelectedPropertiesRead } from "../atom/selectedProperties";
import { useFormInputs } from "../hooks/useFormInputs";
import { css } from "../styles/stitches.config";
import { PlainButton } from "./button";
import { InlineEdit } from "./input";

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

  const [
    valueInputValue,
    onChangeUpdateValueInput,
    setValueInputValue,
  ] = useFormInputs<HTMLInputElement>(value);

  const validValue = useRef<string>(value); // Stores previous valid Value

  const allowEdit = keys !== "children";

  /**
   * At first we will check if the current valueInputValue is same as  validValue if thats the case then we dont apply any
   * operation
   *
   * Then JSON.parse the value if the value is not of valid type we will set the valueInputValue
   * to validValue.
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
        validValue.current = valueInputValue;
      }
    } catch (err) {
      e.preventDefault();
      setValueInputValue(validValue.current);
    }
  };
  1;

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
  }, [value, setValueInputValue]);

  return (
    <Fragment>
      <div className={css({ $reset: "", $truncate: "", color: "#3B82F6" })()}>
        {keys}
      </div>
      <div>:</div>
      <div className={css({ $reset: "", $truncate: "", width: "100%" })()}>
        {allowEdit ? (
          <InlineEdit
            value={valueInputValue}
            onBlur={onBlur}
            onChange={onChangeUpdateValueInput}
          />
        ) : (
          <span>{valueInputValue}</span>
        )}
      </div>
      <PlainButton
        className={css({
          color: "#F87171",
          paddingLeft: "0.5rem",
          visibility: allowEdit && keys !== "text" ? "visible" : "hidden",
        })()}
        onClick={onRemoveClick}
      >
        X
      </PlainButton>
    </Fragment>
  );
};
// className="text-red-400 pl-2"
// truncate text-blue-500
