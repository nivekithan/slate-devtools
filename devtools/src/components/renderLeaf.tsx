import React, { CSSProperties } from "react";
import { ReactEditor, RenderLeafProps, useEditor, useSlate } from "slate-react";
import { useCopyOnClick } from "../hooks/useCopyOnClick";
import { useToggleOnClick } from "../hooks/useToggleOnClick";

export const RenderLeaf = ({ text, attributes, children }: RenderLeafProps) => {
  const { devtools_depth: depth } = text;

  const editor = useSlate();

  const [shouldShowText, onClick] = useToggleOnClick<HTMLDivElement>(false);
  const copyOnClick = useCopyOnClick(
    JSON.stringify(ReactEditor.findPath(editor, text))
  );

  const depthStyle = (depth: number): CSSProperties => {
    return {
      marginLeft: `${depth}rem`,
    };
  };

  return (
    <div
      {...attributes}
      style={{ ...depthStyle((depth as number) || 1) }}
      contentEditable={false}
    >
      <div className="flex gap-x-3">
        <div onClick={onClick} className="cursor-pointer">
          +
        </div>

        <div>{`<Text />`}</div>
        <div onClick={copyOnClick} className="text-gray-500">C</div>
      </div>
      {shouldShowText ? (
        <div style={{ ...depthStyle(((depth as number) || 1) + 1) }}>
          {text.text}
        </div>
      ) : null}
    </div>
  );
};
