import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
import { createPortal } from "react-dom";
import { Node } from "slate";
import { ReactEditor } from "slate-react";
import { DevSlate } from "./devSlate";
import { PropertiesEditor } from "./propertiesEditor";
import { Menu } from "./menu";
import { RenderHistory } from "./renderHistory";
import { ScriptEditor } from "./scriptEditor";

type DevtoolsProps = {
  value: Node[]; // NodeList value to show in devtools
  editor: ReactEditor; // Corresponding editor
  module ?: {
    [index : string] : unknown
  }
};

export const Devtools = ({ value, editor, module={} }: DevtoolsProps) => {
  const [devValue, setDevValue] = useState<Node[]>(value);

  return createPortal(
    <div className=" bg-hex-282a36 text-white rounded flex flex-col p-5 ">
      <div>
        <Menu value={value} editor={editor} devValue={devValue} />
      </div>
      <div className="h-400px min-h-100px  p-4 flex gap-x-100px ">
        <div>
          <DevSlate
            value={value}
            editor={editor}
            key="devtools_editor"
            devValue={devValue}
            setDevValue={setDevValue}
          />
        </div>
        <div>
          <PropertiesEditor />
        </div>
        <div className="overflow-y-auto rounded w-400px bg-hex-272535 p-5">
          <RenderHistory />
        </div>
      </div>
      <div className="flex-end">
        <ScriptEditor module={module} editor={editor} />
      </div>
    </div>,
    document.body
  );
};
