import React, { useMemo, useState, useEffect, useCallback } from "react";
import { withDepth, withId, withIndex } from "../plugins";
import { createEditor, Node, Editor } from "slate";
import {
  withReact,
  Slate,
  Editable,
  RenderElementProps,
  RenderLeafProps,
} from "slate-react";
import { RenderElement } from "../components/renderElement";
import { RenderLeaf } from "../components/renderLeaf";
import { SlateEditorErrorBoundry } from "../components/ErrorBoundry";
import { useDevEditor } from "../contexts/devEditor";

type Props = {
  value: Node[];
};

export const DevSlate = ({ value }: Props) => {
  const devEditor = useDevEditor()
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
  useEffect(() => {
    Editor.normalize(devEditor, { force: true });
  }, []);
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
