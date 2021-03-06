import React, { CSSProperties, useEffect } from "react";
import { ReactEditor, RenderLeafProps, useSlate } from "slate-react";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useSearchedProperties } from "../atom/searchedPath";
import { useSelectedProperties } from "../atom/selectedProperties";
import { useCopyOnClick } from "../hooks/useCopyOnClick";
import { useToggleOnClick } from "../hooks/useToggleOnClick";
import { isEmptyProperties } from "../util/isEmptyProperties";
import { isSubset } from "../util/isSubset";

export const RenderLeaf = ({ text }: RenderLeafProps) => {
  const { devtools_depth: depth, devtools_id: id } = text;
  const editor = useSlate();

  const [selectedProperties, setSelectedProperties] = useSelectedProperties();
  const [searchedProperties, setSearchedProperties] = useSearchedProperties();

  const path = ReactEditor.findPath(editor, text);

  const depthStyle = (depth: number): CSSProperties => {
    return {
      marginLeft: `${depth}rem`,
    };
  };

  const [
    shouldShowText,
    onClick,
    setShouldShowChildren,
  ] = useToggleOnClick<HTMLButtonElement>(false);

  const copyOnClick = useCopyOnClick(
    JSON.stringify(ReactEditor.findPath(editor, text))
  );

  const onClickUpateSelectedProperties = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
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

  useEffect(() => {
    if (!isEmptyProperties(searchedProperties)) {
      const {
        node: { devtools_id: searchedId },
        path: searchedPath,
      } = searchedProperties;

      if (isSubset(searchedPath, path)) {
        setShouldShowChildren(true);

        if (searchedId === id) {
          setSelectedProperties({ node: text, path: path });
          setSearchedProperties({ node: { children: [] }, path: [] });
          setShouldShowChildren(false);
        }
      }
    }
  }, [
    id,
    path,
    searchedProperties,
    setSearchedProperties,
    setSelectedProperties,
    setShouldShowChildren,
    text,
  ]);

  return (
    <div
      style={{ ...depthStyle((depth as number) || 1) }}
      contentEditable={false}
      className="text-sm"
    >
      <div className="flex gap-x-3">
        <button onClick={onClick}>+</button>

        <button onClick={onClickUpateSelectedProperties}>{`<Text />`}</button>
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
