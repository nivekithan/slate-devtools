import React from "react";
import { Operation } from "slate";
import { InsertNodes } from "./insertNode";
import { InsertText } from "./insertText";
import { MergeNode } from "./mergeNode";
import { MoveNode } from "./moveNode";
import { RemoveNode } from "./removeNode";
import { SetNode } from "./setNode";
import { SplitNode } from "./splitNode";

type Props = {
  op: Operation;
};

export const RenderFullOperation = ({ op }: Props) => {
  switch (op.type) {
    case "insert_node":
      return <InsertNodes op={op} />;
    case "insert_text":
      return <InsertText op={op} />;
    case "merge_node":
      return <MergeNode op={op} />;
    case "move_node":
      return <MoveNode op={op} />;
    case "remove_node":
      return <RemoveNode op={op} />;
    case "set_node":
      return <SetNode op={op} />;
    case "split_node":
      return <SplitNode op={op} />;
  }

  return null;
};
