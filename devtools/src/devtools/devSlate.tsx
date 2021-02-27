import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { withDepth, withId, withIndex } from "../plugins";
import { createEditor, Node, Editor } from "slate";
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
import { useDevEditor } from "../contexts/devEditor";
import { useSetSelectedProperties } from "../contexts/selectedProperties";

type Props = {
  value: Node[];
  editor: ReactEditor;
};

export const DevSlate = ({ value, editor }: Props) => {
  // console.log("I am here")
  const devEditor = useDevEditor();
  const [devValue, setDevValue] = useState<Node[]>(value);

  useLayoutEffect(() => {
    const { operations } = editor;
    operations.forEach(devEditor.apply);
  }, [value]);

  const renderElement = useCallback(
    (props: RenderElementProps) => <RenderElement {...props} />,
    []
  );

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <RenderLeaf {...props} />,
    []
  );

  // Normalize the editor
  useEffect(() => {
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
