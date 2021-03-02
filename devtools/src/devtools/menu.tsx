import { computeStyles } from "@popperjs/core";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Editor, Node, Operation } from "slate";
import { ReactEditor } from "slate-react";
import { useDevEditorRead } from "../atom/devEditor";
import { useSelectedPropertiesRead } from "../atom/selectedProperties";
import { useUpdateApp, useUpdateAppRead } from "../atom/updateApp";
import { useUpdateDevtools } from "../atom/updateDevtools";
import { RenderPath } from "../components/renderPath";
import { Search } from "../components/search";
import { UpdateButtons } from "./updateButtons";

type Props = {
  editor: ReactEditor;
  value: Node[];
  devValue: Node[];
};

export const Menu = ({ editor, value, devValue }: Props) => {
  const [{ path }] = useSelectedPropertiesRead();

  const onSearchSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    value: string
  ) => {
    e.preventDefault();
    try {
      const parsedValue = JSON.parse(value);
      console.log(parsedValue);
      return true;
    } catch (err) {
      return false;
    }
  };

  return (
    <div className="flex items-center gap-x-21">
      <UpdateButtons editor={editor} value={value} devValue={devValue} />
      <div className="flex gap-x-3">
        <div className="font-semibold text-green-500">Selected Path :</div>
        <RenderPath path={path} />
      </div>
      <Search startValue={'"[  ]"'} onSubmit={onSearchSubmit} />
    </div>
  );
};
