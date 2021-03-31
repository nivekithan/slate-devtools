import { useEffect } from "react";
import {
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  useSlate,
} from "slate-react";
import { useSearchedProperties } from "../atom/searchedPath";
import { useSelectedProperties } from "../atom/selectedProperties";
import { copyOnClick } from "../util/copyOnClick";
import { useToggleOnClick } from "../hooks/useToggleOnClick";
import { isEmptyProperties } from "../util/isEmptyProperties";
import { isRenderElementProps } from "../util/isRenderElementProps";
import { isSubset } from "../util/isSubset";
import React from "react";
import { NodeLayout } from "./layout";
import { PlainButton } from "./button";
import { useMemo } from "react";
import { useCallback } from "react";

export const RenderNode = (
  props: (RenderElementProps | RenderLeafProps) & { type: string }
) => {
  const ele = useMemo(
    () => (isRenderElementProps(props) ? props.element : props.text),
    [props]
  );
  const type = ele[props.type];

  const devEditor = useSlate();

  const [
    { path: selectedPath },
    setSelectedProperties,
  ] = useSelectedProperties();
  const [searchedProperties, setSearchedProperties] = useSearchedProperties();

  const path = useMemo(() => ReactEditor.findPath(devEditor, ele), [
    devEditor,
    ele,
  ]);

  const [showChildren, onClickShowChildren, setShowChildren] = useToggleOnClick(
    false
  );

  const onClickCopy = copyOnClick(JSON.stringify(path));

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
   *
   * We will update the selectedProperties with current ele and path so that it
   * will stay current even when the properties of ele or path changes due to other reasons
   * (like updating ele through scriptEditor)
   *
   */

  useEffect(() => {
    if (isSubset(selectedPath, path) && selectedPath.length === path.length) {
      setSelectedProperties({ node: ele, path: path });
    }
  }, [ele, path, selectedPath, setSelectedProperties]);

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
   * And if the searchedPath is equal to path then the user searched for this node
   * so we will setSelectedProperties to this ele and path and we wont show its children
   * since this is node user wanted
   *
   * After that we will clear the searchedProperties by setting it with emptyProperty
   *
   */

  useEffect(() => {
    if (!isEmptyProperties(searchedProperties)) {
      const { path: searchedPath } = searchedProperties;

      if (isSubset(searchedPath, path)) {
        setShowChildren(true);

        if (searchedPath.length === path.length) {
          setSelectedProperties({ node: ele, path: path });
          setSearchedProperties({ node: { children: [] }, path: [] });
          setShowChildren(false);
        }
      }
    }
  }, [
    ele,
    path,
    searchedProperties,
    setSearchedProperties,
    setSelectedProperties,
    setShowChildren,
  ]);

  /**
   * Computes the marginLeft with depth.
   * Most likely I will change it to paddingLeft so that when
   * we can highlight the selectedProperties with different background colour
   */

  const depth = useCallback(
    (increase = 0) => {
      return (path.length || 1 + increase) * 1.5;
    },
    [path.length]
  );

  return (
    <NodeLayout style={{ marginLeft: `${depth()}rem` }} contentEditable={false}>
      <div>
        <PlainButton onClick={onClickShowChildren}>+</PlainButton>
        <PlainButton onClick={onClickUpdateSelectedProperties}>{`<${
          isRenderElementProps(props) ? type || "normal" : "text"
        } />`}</PlainButton>
        <PlainButton
          onClick={onClickCopy}
          className="devtools_slate_gray"
          data-cy-path={path}
        >
          C
        </PlainButton>
      </div>
      {showChildren ? (
        isRenderElementProps(props) ? (
          props.children
        ) : (
          <div style={{ marginLeft: `${depth(1)}rem` }}>{props.text.text}</div>
        )
      ) : null}
    </NodeLayout>
  );
};
