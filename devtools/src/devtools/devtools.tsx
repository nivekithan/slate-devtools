import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Node } from "slate";
import { ReactEditor } from "slate-react";
import {
  SelectedPropertiesProvider,
  SelectedProperties,
} from "../contexts/selectedProperties";
import { DevSlate } from "./devSlate";

type DevtoolsProps = {
  value: Node[]; // NodeList value to show in devtools
  editor: ReactEditor; // Corresponding editor
};

export const Devtools = ({ value, editor }: DevtoolsProps) => {
  const [
    selectedProperties,
    setSelectedProperties,
  ] = useState<SelectedProperties>({ node: { children: [] }, path: [] });

  return createPortal(
    <SelectedPropertiesProvider
      value={selectedProperties}
      dispatch={setSelectedProperties}
    >
      <div className="w-full h-400px min-h-100px  bg-hex-282a36 text-white rounded p-4">
        <div>
          <DevSlate value={value} />
        </div>
      </div>
    </SelectedPropertiesProvider>,
    document.body
  );
};
