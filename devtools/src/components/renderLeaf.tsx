import React, { CSSProperties } from "react";
import { ReactEditor, RenderLeafProps, useEditor, useSlate } from "slate-react";
import useDeepCompareEffect from "use-deep-compare-effect";
import {
  useSelectedProperties,
  useSetSelectedProperties,
} from "../contexts/selectedProperties";
import { useCopyOnClick } from "../hooks/useCopyOnClick";
import { useToggleOnClick } from "../hooks/useToggleOnClick";

export const RenderLeaf = ({ text, attributes }: RenderLeafProps) => {
  const { devtools_depth: depth, devtools_id: id } = text;
  const editor = useSlate();

  const selectedProperties = useSelectedProperties();
  const setSelectedProperties = useSetSelectedProperties();

  const path = ReactEditor.findPath(editor, text);

  const depthStyle = (depth: number): CSSProperties => {
    return {
      marginLeft: `${depth}rem`,
    };
  };

  const [shouldShowText, onClick] = useToggleOnClick<HTMLButtonElement>(false);

  const copyOnClick = useCopyOnClick(
    JSON.stringify(ReactEditor.findPath(editor, text))
  );

  const onClickUpateSelectedProperties = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    // console.log({ text, path });

    setSelectedProperties({ node: text, path: path });
  };

  useDeepCompareEffect(() => {
    const {
      node: { devtools_id: selectedId },
    } = selectedProperties;
    // console.log({ selectedId, selectedProperties, id, text, path });

    if (id === selectedId) {
      setSelectedProperties({ node: text, path: path });
    }
  }, [path, text, selectedProperties, id]);

  return (
    <div
      {...attributes}
      style={{ ...depthStyle((depth as number) || 1) }}
      contentEditable={false}
    >
      <div className="flex gap-x-3">
        <button onClick={onClick}>+</button>

        <div onClick={onClickUpateSelectedProperties}>{`<Text />`}</div>
        <button onClick={copyOnClick} className="text-gray-500">
          C
        </button>
      </div>
      {shouldShowText ? (
        <div style={{ ...depthStyle(((depth as number) || 1) + 1) }}>
          {text.text}
        </div>
      ) : null}
    </div>
  );
};
