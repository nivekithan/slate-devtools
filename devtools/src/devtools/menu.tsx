import { computeStyles } from "@popperjs/core";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Editor, Node, Operation, Path } from "slate";
import { ReactEditor } from "slate-react";
import { useDevEditorRead } from "../atom/devEditor";
import { useSearchedPropertiesSet } from "../atom/searchedPath";
import { useSelectedPropertiesRead } from "../atom/selectedProperties";
import { useUpdateApp, useUpdateAppRead } from "../atom/updateApp";
import { useUpdateDevtools } from "../atom/updateDevtools";
import { RenderPath } from "../components/renderPath";
import { Search } from "../components/search";
import { HistoryEditor } from "../util/historyEditor";
import { UpdateButtons } from "./updateButtons";

type Props = {
  editor: ReactEditor;
  value: Node[];
  devValue: Node[];
};

export const Menu = ({ editor, value, devValue }: Props) => {
  const [{ path }] = useSelectedPropertiesRead();
  const [devEditor] = useDevEditorRead();
  const [, setSearchedProperties] = useSearchedPropertiesSet();

  const onSearchSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    value: string
  ) => {
    e.preventDefault();
    try {
      const path = JSON.parse(value);
      if (!Path.isPath(path)) return false;
      try {
        const searchedNode = Node.get(devEditor, path);
        setSearchedProperties({ node: searchedNode, path: path });
      } catch (err) {
        setSearchedProperties({ node: { children: [] }, path: [] });
      }
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
      <Search startValue={`[  ]`} onSubmit={onSearchSubmit} />
    </div>
  );
};
