import { RenderElementProps } from "slate-react";
import React, { CSSProperties } from "react";
import { useToggleOnClick } from "../hooks/useToggleOnClick";

export const RenderElement = ({
  attributes,
  children,
  element,
}: RenderElementProps) => {
  let { type, devtools_depth: depth } = element;

  const [shouldShowChildren, onClick] = useToggleOnClick<HTMLDivElement>(false);

  if (typeof type !== "string") {
    type = "normal";
  }

  const depthStyle: CSSProperties = {
    marginLeft: `${(depth as number) || 1 * 1.5}rem`,
  };

  return (
    <div {...attributes} style={{ ...depthStyle }} contentEditable={false}>
      <div className="flex gap-x-3">
        <div onClick={onClick} className="cursor-pointer">
          +
        </div>
        <div>{`<${type} />`}</div>
      </div>
      {shouldShowChildren ? children : null}
    </div>
  );
};
