import React, { CSSProperties } from "react";
import { RenderLeafProps } from "slate-react";
import { useToggleOnClick } from "../hooks/useToggleOnClick";

export const RenderLeaf = ({ text, attributes, children }: RenderLeafProps) => {
  const { devtools_depth: depth } = text;

  const [shouldShowText, onClick] = useToggleOnClick(false);

  const depthStyle = (depth: number): CSSProperties => {
    return {
      marginLeft: `${depth * 1.5}rem`,
    };
  };

  return (
    <div {...attributes} style={{ ...depthStyle((depth as number) || 1) }} contentEditable={false}>
      <div className="flex gap-x-3" >
        <div onClick={onClick} className={"cursor-pointer"}>
          +
        </div>

        <div>{`<Text />`}</div>
      </div>
      {shouldShowText ? (
        <div style={{ ...depthStyle(((depth as number) || 1) + 1) }}>
          {text.text}
        </div>
      ) : null}
    </div>
  );
};
