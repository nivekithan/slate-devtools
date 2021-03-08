import React, { Fragment, useState } from "react";
import { Node } from "slate";
import { ReactEditor } from "slate-react";
import { DevSlate } from "./devSlate";
import { PropertiesEditor } from "./propertiesEditor";
import { Menu } from "./menu";
import { RenderHistory } from "./renderHistory";
import { ScriptEditor } from "./scriptEditor";
import "../styles/scrollbar.css";
import { useToggleOnClick } from "../hooks/useToggleOnClick";
import ReactDOM from "react-dom";
import "windi.css";
import { Resizable } from "../components/resizable";
import clone from "clone";

type Props = {
  value: Node[]; // NodeList value to show in devtools
  editor: ReactEditor; // Corresponding editor
  module?: {
    [index: string]: unknown;
  };
  open?: boolean;
};

export const Devtools = ({
  value,
  editor,
  module = {},
  open = false,
}: Props) => {
  const [devValue, setDevValue] = useState<Node[]>(clone(value));
  const [isOpen, onClickToggle] = useToggleOnClick<HTMLButtonElement>(open);

  return ReactDOM.createPortal(
    <Fragment>
      <div
        className={`fixed bg-hex-282a36  min-h-325px max-h-325px text-white flex flex-col p-2 gap-y-2 custom-scroll ${
          isOpen ? "right-0 left-0 bottom-0" : "-ml-10000px"
        }`}
      >
        <div className="flex justify-between">
          <Menu editor={editor} value={value} devValue={devValue} />
          <button
            className="text-xs px-2 py-1 bg-red-700 hover:bg-red-600 "
            onClick={onClickToggle}
          >
            Close
          </button>
        </div>
        <div className="flex gap-x-5 flex-1 h-195px">
          <div className="flex-1 overflow-auto max-h-195px  ">
            <DevSlate devValue={devValue} setDevValue={setDevValue} />
          </div>
          <div>
            <Resizable width="400px">
              <div className="ml-5">
                <PropertiesEditor />
              </div>
            </Resizable>
          </div>
          <div>
            <Resizable width="400px">
              <div className="rounded w-full bg-hex-272535 p-5">
                <RenderHistory />
              </div>
            </Resizable>
          </div>
        </div>
        <div>
          <ScriptEditor editor={editor} module={module} />
        </div>
      </div>
      {isOpen ? null : (
        <button
          onClick={onClickToggle}
          className={`fixed left-0 bottom-0 ml-20px mb-20px bg-hex-282a36 w-50px h-50px text-white rounded-25px  grid place-items-center text-xs`}
        >
          Open
        </button>
      )}
    </Fragment>,
    document.body
  );
};
