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
import clone from "clone";
import { Button } from "../components/button";
import { MenuLayout } from "../components/layout/menuLayout";
import { Layout } from "../components/layout/layout";

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
      <Layout show={isOpen ? "yes" : "no"} height="325px">
        <MenuLayout className="row-1">
          <Menu editor={editor} value={value} devValue={devValue} />
          <Button onClick={onClickToggle} color="red">
            Close
          </Button>
        </MenuLayout>
        <div className="row-2">
          <DevSlate devValue={devValue} setDevValue={setDevValue} />
          <PropertiesEditor />
          <RenderHistory />
        </div>
        <div className="row-3">
          <ScriptEditor editor={editor} module={module} />
        </div>
      </Layout>
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
