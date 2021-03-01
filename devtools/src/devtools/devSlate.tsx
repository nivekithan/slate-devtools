import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";
import { withDepth, withId, withIndex } from "../plugins";
import { createEditor, Node, Editor, Transforms, Range } from "slate";
import {
  withReact,
  Slate,
  Editable,
  RenderElementProps,
  RenderLeafProps,
  ReactEditor,
} from "slate-react";
import { RenderElement } from "../components/renderElement";
import { RenderLeaf } from "../components/renderLeaf";
import { SlateEditorErrorBoundry } from "../components/ErrorBoundry";
import { useDevEditorRead } from "../atom/devEditor";

type Props = {
  value: Node[];
  editor: ReactEditor;
};

export const DevSlate = ({ value, editor }: Props) => {
  const [devEditor] = useDevEditorRead();
  const [devValue, setDevValue] = useState<Node[]>(value);

  const renderElement = useCallback(
    (props: RenderElementProps) => <RenderElement {...props} />,
    []
  );

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <RenderLeaf {...props} />,
    []
  );

  // Normalize the editor
  useLayoutEffect(() => {
    Editor.normalize(devEditor, { force: true });
  }, []);

  // console.log(devValue);

  return (
    <SlateEditorErrorBoundry>
      <Slate value={devValue} editor={devEditor} onChange={setDevValue}>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          spellCheck={false}
        />
      </Slate>
    </SlateEditorErrorBoundry>
  );
};
