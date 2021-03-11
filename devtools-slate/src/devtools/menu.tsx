import React from "react";
import { Node, Path } from "slate";
import { ReactEditor } from "slate-react";
import { useDevEditorRead } from "../atom/devEditor";
import { useSearchedPropertiesSet } from "../atom/searchedPath";
import { useSelectedPropertiesRead } from "../atom/selectedProperties";
import { GreenLabel } from "../components/greenLabel";
import { RenderPath } from "../components/path";
import { Search } from "../components/search";
import { styled } from "../styles/stitches.config";
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

  /**
   * If onSearchSubmit returns true then input will set to startValue, else there will be no change
   * in input
   *
   * We will parse the value with JSON.parse() if it throws error then we will catch that error and
   * will return false
   *
   * IF the parsed value is not an path then we ourself will throw an error
   *
   * if parsed value is path then we get the node located at that path and set that as searchedProperties
   * and return true
   *
   * if there is no node at that path then Node.get itself will throw error we will just catch that in another block and
   * set a emptyProperty as searchedProperty and return true
   *
   */

  const onSearchSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    value: string
  ) => {
    e.preventDefault();
    try {
      const path = JSON.parse(value);
      if (!Path.isPath(path)) throw new Error("The parsed value is not path");
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
    <MenuStyled>
      <UpdateButtons editor={editor} value={value} devValue={devValue} />
      <div>
        <GreenLabel>Selected Path :</GreenLabel>
        <RenderPath path={path} />
      </div>
      <Search startValue={`[  ]`} onSubmit={onSearchSubmit} />
    </MenuStyled>
  );
};

const MenuStyled = styled("div", {
  $reset: "",
  display: "flex",
  alignItems: "center",
  columnGap: "5.25rem",

  "& > div": {
    $reset: "",
    "&:nth-child(2)": {
      display: "flex",
      columnGap: "0.75rem",
      alignItems: "center",
    },
  },
});
