import { ReactEditor, RenderElementProps, useSlate } from "slate-react";
import React, { CSSProperties, useEffect } from "react";
import { useToggleOnClick } from "../hooks/useToggleOnClick";
import { useCopyOnClick } from "../hooks/useCopyOnClick";

import useDeepCompareEffect from "use-deep-compare-effect";
import { useSelectedProperties } from "../atom/selectedProperties";
import { useSearchedProperties } from "../atom/searchedPath";
import { isEmptyProperties } from "../util/isEmptyProperties";

import { isSubset } from "../util/isSubset";

export const RenderElement = ({ children, element }: RenderElementProps) => {
  let { type, devtools_depth: depth, devtools_id: id } = element;
  if (typeof type !== "string") {
    type = "normal";
  }

  const editor = useSlate();
  const path = ReactEditor.findPath(editor, element);

  const [selectedProperties, setSelectedProperties] = useSelectedProperties();
  const [searchedProperties, setSearchedProperties] = useSearchedProperties();

  const [
    shouldShowChildren,
    onClickToggle,
    setShouldShowChildren,
  ] = useToggleOnClick<HTMLButtonElement>(false);

  const depthStyle: CSSProperties = {
    marginLeft: `${(depth as number) || 1 * 1.5}rem`,
  };

  const onClickCopy = useCopyOnClick(
    JSON.stringify(ReactEditor.findPath(editor, element))
  );

  const onClickUpdateSelectedProperties = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    // console.log({element, path})
    setSelectedProperties({ node: element, path: path });
  };

  useDeepCompareEffect(() => {
    const {
      node: { devtools_id: selectedId },
    } = selectedProperties;

    if (id === selectedId) {
      setSelectedProperties({ node: element, path: path });
    }
  }, [selectedProperties, id, element, path]);

  useEffect(() => {
    if (!isEmptyProperties(searchedProperties)) {
      const {
        node: { devtools_id: searchedId },
        path: searchedPath,
      } = searchedProperties;

      if (isSubset(searchedPath, path)) {
        setShouldShowChildren(true);

        if (searchedId === id) {
          setSelectedProperties({ node: element, path: path });
          setSearchedProperties({ node: { children: [] }, path: [] });
          setShouldShowChildren(false);
        }
      }
    }
  }, [searchedProperties]);

  return (
    <div style={{ ...depthStyle }} contentEditable={false}>
      <div className="flex gap-x-3">
        <button onClick={onClickToggle}>+</button>
        <div onClick={onClickUpdateSelectedProperties}>{`<${type} />`}</div>
        <button onClick={onClickCopy} className="text-gray-500">
          C
        </button>
      </div>
      {shouldShowChildren ? children : null}
    </div>
  );
};
