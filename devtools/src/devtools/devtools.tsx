import React, { useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { Node, createEditor } from "slate";
import { ReactEditor, withReact } from "slate-react";
import { DevEditorProvider } from "../contexts/devEditor";
import {
  SelectedPropertiesProvider,
  SelectedProperties,
} from "../contexts/selectedProperties";
import { withDepth, withId, withIndex } from "../plugins";
import { DevSlate } from "./devSlate";
import { PropertiesEditor } from "./propertiesEditor";

type DevtoolsProps = {
  value: Node[]; // NodeList value to show in devtools
  editor: ReactEditor; // Corresponding editor
};

export const Devtools = ({ value, editor }: DevtoolsProps) => {
  const [
    selectedProperties,
    setSelectedProperties,
  ] = useState<SelectedProperties>({ node: { children: [] }, path: [] });
  const devEditor = useMemo(
    () => withIndex(withId(withDepth(withReact(createEditor())))),
    []
  );

  return createPortal(
    <SelectedPropertiesProvider
      value={selectedProperties}
      dispatch={setSelectedProperties}
    >
      <div className="w-full h-400px min-h-100px  bg-hex-282a36 text-white rounded p-4 flex gap-x-100px">
        <DevEditorProvider value={devEditor}>
          <div>
            <DevSlate value={value} />
          </div>
          <div>
            <PropertiesEditor />
          </div>
        </DevEditorProvider>
      </div>
    </SelectedPropertiesProvider>,
    document.body
  );
};
