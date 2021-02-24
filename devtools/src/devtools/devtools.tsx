import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { createEditor, Editor, Node } from "slate";
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  Slate,
  withReact,
} from "slate-react";
import { RenderElement } from "../components/renderElement";
import { withDepth } from "../plugins/withDepth";

type DevtoolsProps = {
  value: Node[]; // NodeList value to show in devtools
  editor: ReactEditor; // Corresponding editor
};

export const Devtools = ({ value, editor }: DevtoolsProps) => {
  const devEditor = useMemo(() => withDepth(withReact(createEditor())), []);
  const [devValue, setDevValue] = useState<Node[]>(value);

  const renderElement = useCallback(
    (props: RenderElementProps) => <RenderElement {...props} />,
    []
  );

  // Normalize the editor
  useEffect(() => {
    Editor.normalize(devEditor);
  }, []);

  return createPortal(
    <div className="fixed bottom-30px inset-x-30px">
      <div className="w-full h-400px min-h-100px bg-hex-282a36 text-white rounded p-4">
        <div>
          <Slate value={devValue} editor={devEditor} onChange={setDevValue}>
            <Editable renderElement={renderElement} />
          </Slate>
        </div>
      </div>
    </div>,

    document.body
  );
};
