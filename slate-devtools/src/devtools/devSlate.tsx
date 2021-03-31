import React, { useCallback, useEffect } from "react";
import { Node, Editor } from "slate";
import {
  Slate,
  Editable,
  RenderElementProps,
  RenderLeafProps,
} from "slate-react";
import { SlateEditorErrorBoundary } from "../components/ErrorBoundary";
import { useDevEditorRead } from "../atom/devEditor";
import { RenderNode } from "../components/renderNode";

type Props = {
  devValue: Node[];
  setDevValue: (value: Node[]) => void;
  type: string;
};

export const DevSlate = ({ devValue, setDevValue, type }: Props) => {
  const [devEditor] = useDevEditorRead();

  const renderElement = useCallback(
    (props: RenderElementProps) => <RenderNode {...props} type={type} />,
    [type]
  );

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <RenderNode {...props} type={type} />,
    [type]
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
    <SlateEditorErrorBoundary>
      <Slate value={devValue} editor={devEditor} onChange={setDevValue}>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          spellCheck={false}
          style={{ wordWrap: "normal", whiteSpace: "normal" }}
        />
      </Slate>
    </SlateEditorErrorBoundary>
  );
};
