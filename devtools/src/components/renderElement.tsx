import { RenderElementProps } from "slate-react";
import React from "react";
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

  return (
    <div
      {...attributes}
      style={{ marginLeft: `${((depth as number) || 0) * 1.5}rem` }}
    >
      <div className="flex gap-x-3" contentEditable={false}>
        <div onClick={onClick} className="cursor-pointer">
          +
        </div>
        <div>{`<${type} />`}</div>
      </div>
      {shouldShowChildren ? children : null}
    </div>
  );
};
