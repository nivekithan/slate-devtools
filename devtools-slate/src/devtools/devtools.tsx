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
import { Button } from "../components/button";
import { StyledLayout } from "../components/layout/styledLayout";

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
        className={`fixed bg-hex-282a36 ${
          isOpen ? "right-0 left-0 bottom-0" : "-ml-10000px"
        }`}
      >
        <StyledLayout style={{ height: "325px" }}>
          <div className="row-1">
            <div className="flex justify-between pt-1 px-2 w-full">
              <Menu editor={editor} value={value} devValue={devValue} />
              <Button onClick={onClickToggle} color="red">
                Close
              </Button>
            </div>
          </div>
          <div className="row-2">
            <DevSlate devValue={devValue} setDevValue={setDevValue} />
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
          <div className="row-3">
            <ScriptEditor editor={editor} module={module} />
          </div>
        </StyledLayout>
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
