// @refresh reset

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
import { CSSProperties } from "react";
import { DevtoolsEditor } from "../plugins/withDevtools";
import { isDevtoolsEditor } from "../util/isDevtoolsEditor";

export type DevtoolsProps = {
  value: Node[]; // NodeList value to show in devtools
  editor: ReactEditor & DevtoolsEditor; // Corresponding editor
  module?: {
    [index: string]: unknown;
  };
  open?: boolean;
  height?: string;
  style?: CSSProperties;
  type?: string;
};

export const Devtools = ({
  value,
  editor,
  module = {},
  open = false,
  height = "325px",
  style,
  type = "type",
}: DevtoolsProps) => {
  const [devValue, setDevValue] = useState<Node[]>(clone(value));
  const [isOpen, onClickToggle] = useToggleOnClick<HTMLButtonElement>(open);

  if (!isDevtoolsEditor(editor)) {
    throw new Error(
      "The passed editor is not DevtoolsEditor, add plugin withDevtools to the editor. Make sure that withDevtools is last plugin"
    );
  }

  return ReactDOM.createPortal(
    <Fragment>
      <Layout show={isOpen ? "yes" : "no"} height={height}>
        <MenuLayout className="devtools_slate_row-1">
          <Menu editor={editor} value={value} devValue={devValue} />
          <Button onClick={onClickToggle} color="red">
            Close
          </Button>
        </MenuLayout>
        <div className="devtools_slate_row-2">
          <DevSlate devValue={devValue} setDevValue={setDevValue} type={type} />
          <PropertiesEditor />
          <RenderHistory />
        </div>
        <div className="devtools_slate_row-3">
          <ScriptEditor editor={editor} module={module} />
        </div>
      </Layout>
      {isOpen ? null : (
        <RoundButton onClick={onClickToggle} size="50px" style={style}>
          Open
        </RoundButton>
      )}
    </Fragment>,
    document.body
  );
};
