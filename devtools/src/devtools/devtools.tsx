import React, { useState } from "react";
import { Node } from "slate";
import { ReactEditor } from "slate-react";
import { DevSlate } from "./devSlate";
import { PropertiesEditor } from "./propertiesEditor";
import { Menu } from "./menu";
import { RenderHistory } from "./renderHistory";
import { ScriptEditor } from "./scriptEditor";
import { Resizable } from "re-resizable";
import "../styles/scrollbar.css";

type Props = {
  value: Node[]; // NodeList value to show in devtools
  editor: ReactEditor; // Corresponding editor
  module?: {
    [index: string]: unknown;
  };
};

export const Devtools = ({ value, editor, module = {} }: Props) => {
  const [devValue, setDevValue] = useState<Node[]>(value);

  return (
    <div className="fixed bg-hex-282a36 right-0 left-0 bottom-0 min-h-325px max-h-325px text-white flex flex-col p-2 gap-y-2 custom-scroll">
      <div>
        <Menu editor={editor} value={value} devValue={devValue} />
      </div>
      <div className="flex gap-x-5 flex-1">
        <div className="flex-1 overflow-x-auto max-h-195px ">
          <DevSlate
            devValue={devValue}
            editor={editor}
            setDevValue={setDevValue}
            value={value}
          />
        </div>
        <Resizable
          className="border-1 p-2 overflow-y-scroll "
          defaultSize={{ width: "400px", height: "200px" }}
        >
          <PropertiesEditor />
        </Resizable>
        <Resizable
          className="border-1 p-2 overflow-x-scroll min-w-100px"
          defaultSize={{ width: "300px", height: "200px" }}
          enable={{
            left: true,
            right: false,
            bottom: false,
            bottomLeft: false,
            bottomRight: false,
            top: false,
            topLeft: false,
            topRight: false,
          }}
        >
          <div className="rounded w-full bg-hex-272535 p-5">
            <RenderHistory />
          </div>
        </Resizable>
      </div>
      <div>
        <ScriptEditor editor={editor} module={module} />
      </div>
    </div>
  );
};
