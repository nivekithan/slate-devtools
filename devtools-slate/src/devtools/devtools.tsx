import React, { Fragment, useState } from "react";
import { Node } from "slate";
import { ReactEditor } from "slate-react";
import { DevSlate } from "./devSlate";
import { PropertiesEditor } from "./propertiesEditor";
import { Menu } from "./menu";
import { RenderHistory } from "./renderHistory";
import { ScriptEditor } from "./scriptEditor";
import { useToggleOnClick } from "../hooks/useToggleOnClick";
import ReactDOM from "react-dom";
import clone from "clone";
import { Button, RoundButton } from "../components/button";
import { Layout, MenuLayout } from "../components/layout";

export type DevtoolsProps = {
  value: Node[]; // NodeList value to show in devtools
  editor: ReactEditor; // Corresponding editor
  module?: {
    [index: string]: unknown;
  };
  open?: boolean;
  height?: string;
};

export const Devtools = ({
  value,
  editor,
  module = {},
  open = false,
  height = "325px",
}: DevtoolsProps) => {
  const [devValue, setDevValue] = useState<Node[]>(clone(value));
  const [isOpen, onClickToggle] = useToggleOnClick<HTMLButtonElement>(open);

  return ReactDOM.createPortal(
    <Fragment>
      <Layout show={isOpen ? "yes" : "no"} height={height}>
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
        <RoundButton onClick={onClickToggle} size="50px">
          Open
        </RoundButton>
      )}
    </Fragment>,
    document.body
  );
};
