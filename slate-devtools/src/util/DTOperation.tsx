import { nanoid } from "nanoid";
import { Editor, Operation } from "slate";
import { ReactEditor } from "slate-react";
import { DevtoolsEditor } from "../plugins/withDevtools";
import { HistoryEditor, runOptions } from "./historyEditor";

export class DTOperation<T extends Operation> {
  readonly operation: T;
  readonly id: string;

  constructor(operation: Extract<T, Operation>) {
    if (operation.type === "set_selection") {
      throw new Error(
        `Operation of type 'set_selection' is not valid DTOperation ${JSON.stringify(
          operation
        )}`
      );
    }

    this.operation = operation;
    this.id = nanoid();
  }

  apply(
    editor: (ReactEditor & DevtoolsEditor) | (ReactEditor & HistoryEditor),
    options: runOptions = {}
  ) {
    if (HistoryEditor.isHistoryEditor(editor)) {
      editor.apply(this.operation, options);
    } else {
      editor.apply(this.operation);
    }
  }

  static inverse(op: DTOperation<Operation>) {
    return new DTOperation(Operation.inverse(op.operation));
  }

  static inverseOperations(current: DTOperation<Operation>[]) {
    const reverse = current.reverse();

    return reverse.map((op) => {
      return DTOperation.inverse(op);
    });
  }

  static applyOperations(
    editor: (ReactEditor & DevtoolsEditor) | (ReactEditor & HistoryEditor),
    ops: DTOperation<Operation>[]
  ) {
    Editor.withoutNormalizing(editor, () => {
      ops.forEach((op) => {
        op.apply(editor);
      });
    });
  }

  static addOperations(current: DTOperation<Operation>[], ops: Operation[]) {
    const newOperations = ops
      .filter((op) => op.type !== "set_selection")
      .map((op) => new DTOperation<Operation>(op));

    current.push(...newOperations);

    return current;
  }
}
