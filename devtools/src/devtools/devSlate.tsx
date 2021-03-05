import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";
import { withDepth, withId, withIndex } from "../plugins";
import {
  createEditor,
  Node,
  Editor,
  Transforms,
  Range,
  Operation,
} from "slate";
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
  devValue: Node[];
  setDevValue: (value: Node[]) => void;
};

export const DevSlate = ({ value, editor, devValue, setDevValue }: Props) => {
  const [devEditor] = useDevEditorRead();
  const devtoolsOperations = useRef<Operation[]>([]);

  const renderElement = useCallback(
    (props: RenderElementProps) => <RenderElement {...props} />,
    []
  );

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <RenderLeaf {...props} />,
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
  }, [devValue]);

  // Normalize the editor
  useLayoutEffect(() => {
    Editor.normalize(devEditor, { force: true });
  }, []);

  // console.log(devValue);

  return (
    <SlateEditorErrorBoundry>
        <Slate value={devValue} editor={devEditor} onChange={setDevValue}  >
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            spellCheck={false}
            style={{wordWrap : "normal", whiteSpace : "normal"}}
          />
        </Slate>
    </SlateEditorErrorBoundry>
  );
};
