import React, { useCallback, useEffect } from "react";
import { Node, Editor } from "slate";
import {
  Slate,
  Editable,
  RenderElementProps,
  RenderLeafProps,
} from "slate-react";
import { SlateEditorErrorBoundry } from "../components/ErrorBoundry";
import { useDevEditorRead } from "../atom/devEditor";
import { RenderNode } from "../components/renderNode";

type Props = {
  devValue: Node[];
  setDevValue: (value: Node[]) => void;
};

export const DevSlate = ({ devValue, setDevValue }: Props) => {
  const [devEditor] = useDevEditorRead();

  const renderElement = useCallback(
    (props: RenderElementProps) => <RenderNode {...props} />,
    []
  );

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <RenderNode {...props} />,
    []
  );

  /**
   * Normalize the editor after the first rendering
   *
   * Cant use useCallOnce since we have to normalize once devValue is set to devEditor not before.
   * Calling before will lead to absolutely nothing
   */

  useEffect(() => {
    Editor.normalize(devEditor, { force: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SlateEditorErrorBoundry>
      <Slate value={devValue} editor={devEditor} onChange={setDevValue}>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          spellCheck={false}
          style={{ wordWrap: "normal", whiteSpace: "normal" }}
        />
      </Slate>
    </SlateEditorErrorBoundry>
  );
};
