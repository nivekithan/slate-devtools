import { CSSProperties, useEffect } from "react";
import {
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  useSlate,
} from "slate-react";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useSearchedProperties } from "../atom/searchedPath";
import { useSelectedProperties } from "../atom/selectedProperties";
import { copyOnClick } from "../util/copyOnClick";
import { useToggleOnClick } from "../hooks/useToggleOnClick";
import { isEmptyProperties } from "../util/isEmptyProperties";
import { isRenderElementProps } from "../util/isRenderElementProps";
import { isSubset } from "../util/isSubset";
import React from "react";

export const RenderNode = (props: RenderElementProps | RenderLeafProps) => {
  const ele = isRenderElementProps(props) ? props.element : props.text;
  const { devtools_depth: depth, devtools_id: id, type } = ele;

  const devEditor = useSlate();

  const [
    {
      node: { devtools_id: selectedId },
    },
    setSelectedProperties,
  ] = useSelectedProperties();
  const [searchedProperties, setSearchedProperties] = useSearchedProperties();

  const path = ReactEditor.findPath(devEditor, ele);

  const [showChildren, onClickShowChildren, setShowChildren] = useToggleOnClick(
    false
  );

  const onClickCopy = copyOnClick(
    JSON.stringify(ReactEditor.findPath(devEditor, ele))
  );

  /**
   * On clicking on node we will setSelectedProperties to that node and its path
   */

  const onClickUpdateSelectedProperties = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setSelectedProperties({ node: ele, path: path });
  };

  /**
   * we use DeepCompareEffect since in each render we recalculate path if we are to use
   * useEffect instead it will cause infinite rerender
   *
   * We will update the selectedProperties with current ele and path so that it
   * will stay current evev when the properties of ele or path changes due to other reasons
   * (like updating ele through scirptEditor)
   *
   */

  useDeepCompareEffect(() => {
    if (id === selectedId) {
      setSelectedProperties({ node: ele, path: path });
    }
  }, [path, ele, id, selectedId, setSearchedProperties]);

  /**
   * When a user searches the path using Search by Path the result will be either a valid result or an
   * EmptyProperty which is `{ node: { children: [] }, path: [] }`
   *
   * If the user never searched then also the searchedProperties will be emptyProperty.
   *
   * if the searchedProperties is emptyProperty then we wont do anything
   *
   * When thats not case we will check if the elePath is subset of searchedPath
   * if thats the case then we showChildren since its children contains the node
   * searched by the user
   *
   * And if the searchedId is equal to id then the user searched for this node
   * so we will setSelectedProperties to this ele and path dnd we wont show its children
   * since this is node user wanted
   *
   * After that we will clear the searchedProperties by setting it with emptyProperty
   *
   */

  useEffect(() => {
    if (!isEmptyProperties(searchedProperties)) {
      const {
        node: { devtools_id: searchedId },
        path: searchedPath,
      } = searchedProperties;

      if (isSubset(searchedPath, path)) {
        setShowChildren(true);

        if (searchedId === id) {
          setSelectedProperties({ node: ele, path: path });
          setSearchedProperties({ node: { children: [] }, path: [] });
          setShowChildren(false);
        }
      }
    }
  }, [
    id,
    path,
    setSearchedProperties,
    setSelectedProperties,
    ele,
    searchedProperties,
    setShowChildren,
  ]);

  /**
   * Computes the marginLeft with depth.
   * Most likely I will change it to paddingLeft so that when
   * we can highlight the selectedProperties with different background colour
   */

  const depthStyle = (depth: number): CSSProperties => {
    return {
      marginLeft: `${depth}rem`,
    };
  };

  return (
    <div
      style={{ ...depthStyle(depth as number) }}
      contentEditable={false}
      className="text-sm"
    >
      <div className="flex gap-x-3">
        <button onClick={onClickShowChildren}>+</button>
        <button onClick={onClickUpdateSelectedProperties}>{`<${
          isRenderElementProps(props) ? type || "normal" : "text"
        } />`}</button>
        <button onClick={onClickCopy} className="text-gray-500">
          C
        </button>
      </div>
      {showChildren ? (
        isRenderElementProps(props) ? (
          props.children
        ) : (
          <div style={{ ...depthStyle(((depth as number) || 1) + 1) }}>
            {props.text.text}
          </div>
        )
      ) : null}
    </div>
  );
};
