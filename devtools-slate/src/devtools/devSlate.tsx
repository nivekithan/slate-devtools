import React, { useCallback, useLayoutEffect, useRef } from "react";
import { Node, Editor, Operation } from "slate";
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
  const devtoolsOperations = useRef<Operation[]>([]);

  const renderElement = useCallback(
    (props: RenderElementProps) => <RenderNode {...props} />,
    []
  );

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <RenderNode {...props} />,
    []
  );

  useLayoutEffect(() => {
    const operations = devtoolsOperations.current;

    for (const operation of devEditor.operations) {
      if (operation.type === "set_selection") {
        continue;
      }
      operations.push(operation);
    }
    devtoolsOperations.current = operations;
  }, [devValue, devEditor.operations]);

  // Normalize the editor
  useLayoutEffect(() => {
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
