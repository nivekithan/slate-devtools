import React, { useState, useMemo, useEffect } from "react";
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
import { Menu } from "./menu";

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

  const [firstButtonState, setFirstButtonState] = useState<"yes" | "no">("no");
  const [secondButtonState, setSecondButtonState] = useState<"yes" | "no">(
    "no"
  );

  useEffect(() => {
    setTimeout(() => {
      setFirstButtonState("yes");
      setSecondButtonState("yes");
    }, 2000);
  });

  return createPortal(
    <SelectedPropertiesProvider
      value={selectedProperties}
      dispatch={setSelectedProperties}
    >
      <div className=" bg-hex-282a36 text-white rounded flex flex-col p-5 ">
        <div>
          <Menu devtools={firstButtonState} app={secondButtonState} />
        </div>
        <div className="h-400px min-h-100px  p-4 flex gap-x-100px ">
          <DevEditorProvider value={devEditor}>
            <div>
              <DevSlate value={value} editor={editor} key="devtools_editor" />
            </div>
            <div>
              <PropertiesEditor />
            </div>
          </DevEditorProvider>
        </div>
      </div>
    </SelectedPropertiesProvider>,
    document.body
  );
};
