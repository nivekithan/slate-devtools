import { ReactEditor, RenderElementProps, useSlate } from "slate-react";
import React, { CSSProperties } from "react";
import { useToggleOnClick } from "../hooks/useToggleOnClick";
import { useToggleOnHover } from "../hooks/useToggleOnHover";
import { useCopyOnClick } from "../hooks/useCopyOnClick";

export const RenderElement = ({
  attributes,
  children,
  element,
}: RenderElementProps) => {
  let { type, devtools_depth: depth } = element;
  const editor = useSlate();

  const [shouldShowChildren, onClickToggle] = useToggleOnClick<HTMLDivElement>(
    false
  );

  const copyOnClick = useCopyOnClick(
    JSON.stringify(ReactEditor.findPath(editor, element))
  );

  if (typeof type !== "string") {
    type = "normal";
  }

  const depthStyle: CSSProperties = {
    marginLeft: `${(depth as number) || 1 * 1.5}rem`,
  };

  return (
    <div {...attributes} style={{ ...depthStyle }} contentEditable={false}>
      <div className="flex gap-x-3">
        <div onClick={onClickToggle} className="cursor-pointer">
          +
        </div>
        <div>{`<${type} />`}</div>
        <div onClick={copyOnClick} className="text-gray-500">
          C
        </div>
      </div>
      {shouldShowChildren ? children : null}
    </div>
  );
};
