import { Editor, Operation } from "slate";
import { ReactEditor } from "slate-react";
import { Batch } from "./batch";
import { DTOperation } from "./DTOperation";

export type runOptions = {
  shouldNormalize?: boolean;
  location?: "App" | "Devtools";
};

export type HistoryEditor = {
  history: Batch[];
  isNormalizing: boolean;
  shouldSave: boolean;
  shouldNormalize: boolean;
  apply: (op: Operation, options: runOptions) => void;
  from: [number, number] | undefined;
  dontMerge: boolean;
};

type Location = [number, number];

type HistoryOptions = {
  from: Location;
  to: Location;
  mode?: "top-bottom" | "bottom-top" | "auto";
  considerFrom?: boolean;
  considerTo?: boolean;
};

export const HistoryEditor = {
  /**
   * Calls an function without saving any of the operations applied because
   * of that function to history
   */

  withoutSave(editor: HistoryEditor, callback: () => unknown) {
    editor.shouldSave = false;
    callback();
    editor.shouldSave = true;
  },

  /**
   * Retuns an generator of Opeartions
   */

  *operations(editor: HistoryEditor, options: HistoryOptions) {
    const { history } = editor;
    const {
      from: [fromBatch, fromOp],
      to: [toBatch, toOp],
      considerFrom = true,
      considerTo = false,
    } = options;

    let { mode = "auto" } = options;

    if (mode === "auto") {
      if (fromBatch > toBatch) {
        mode = "bottom-top";
      } else if (fromBatch < toBatch) {
        mode = "top-bottom";
      } else if (fromBatch === toBatch && fromOp > toOp) {
        mode = "bottom-top";
      } else if (fromBatch === toBatch && fromOp < toOp) {
        mode = "top-bottom";
      } else {
        mode = "top-bottom";
      }
    }

    const hightToLow = fromBatch < toBatch;
    const topToBottom = mode === "top-bottom";

    try {
      for (
        let i = fromBatch;
        hightToLow ? i <= toBatch : i >= toBatch;
        hightToLow ? i++ : i--
      ) {
        const operations = history[i].ops;

        let j;
        for (
          topToBottom ? (j = 0) : (j = operations.length - 1);
          topToBottom ? j < operations.length : j >= 0;
          topToBottom ? j++ : j--
        ) {
          if (i === fromBatch) {
            if (!operations[fromOp]) {
              throw new Error(
                "Either from or to is not valid" +
                  JSON.stringify({
                    from: [fromBatch, fromOp],
                    to: [toBatch, toOp],
                  })
              );
            }

            if (topToBottom) {
              if (considerFrom ? j < fromOp : j <= fromOp) {
                continue;
              }
            } else {
              if (considerFrom ? j > fromOp : j >= fromOp) {
                continue;
              }
            }
          }

          if (i === toBatch) {
            if (!operations[toOp]) {
              throw new Error(
                "Either from or to is not valid" +
                  JSON.stringify({
                    from: [fromBatch, fromOp],
                    to: [toBatch, toOp],
                  })
              );
            }

            if (topToBottom) {
              if (considerTo ? j > toOp : j >= toOp) {
                break;
              }
            } else {
              if (considerTo ? j < toOp : j <= toOp) {
                break;
              }
            }
          }

          const operation = operations[j];

          if (operation) {
            yield operation;
          } else {
            throw new Error(
              "Either from or to is not valid" +
                JSON.stringify({
                  from: [fromBatch, fromOp],
                  to: [toBatch, toOp],
                })
            );
          }
        }
      }
    } catch (err) {
      throw new Error(
        "Either from or to is not valid" +
          JSON.stringify({
            from: [fromBatch, fromOp],
            to: [toBatch, toOp],
          })
      );
    }
  },
  /**
   * Generator yields inverse of operations based on options
   */

  *inverseOperations(editor: HistoryEditor, options: HistoryOptions) {
    for (const operation of this.operations(editor, options)) {
      yield DTOperation.inverse(operation);
    }
  },
  /**
   * Applies operations to the given editor. The function will take care if we should
   * apply the inverse of the operations or not
   */

  apply(
    editor: HistoryEditor & ReactEditor,
    from: [number, number],
    to: [number, number]
  ) {
    const { history } = editor;
    const [fromBatch, fromOp] = from;
    const [toBatch, toOp] = to;

    /**
     * If the given from or to is invalid throw error
     */

    if (
      !history[fromBatch] ||
      !history[fromBatch].ops[fromOp] ||
      !history[toBatch] ||
      !history[toBatch].ops[toOp]
    ) {
      throw new Error(
        "Either from or to is not valid" +
          JSON.stringify({
            from: [fromBatch, fromOp],
            to: [toBatch, toOp],
          })
      );
    }
    /**
     * Finds out if we have to inverse the operation or not
     */

    const inverse =
      fromBatch > toBatch || (fromBatch === toBatch && fromOp > toOp);

    if (inverse) {
      /**
       * We wont have to consider the operation in `to` since we have to go to that state
       * if we consider the `to`then we will apply the inverse of that operation thus making us go
       * to the previous state
       *
       */

      this.withoutSave(editor, () => {
        Editor.withoutNormalizing(editor, () => {
          for (const operation of this.inverseOperations(editor, {
            from,
            to,
            mode: "bottom-top",
            considerFrom: true,
            considerTo: false,
          })) {
            operation.apply(editor);
          }
        });
      });
    } else {
      /**
       * If we are not inverting then we wont have to consider from
       * since we already applied that operation.
       */

      this.withoutSave(editor, () => {
        Editor.withoutNormalizing(editor, () => {
          for (const operations of this.operations(editor, {
            from,
            to,
            mode: "top-bottom",
            considerFrom: false,
            considerTo: true,
          })) {
            operations.apply(editor);
          }
        });
      });
    }
  },
  /**
   * Given an HistoryEditor and `till` the function will return
   * operations till `till`
   */

  giveTill(editor: HistoryEditor, till: [number, number]): Batch[] {
    const { history } = editor;

    if (!history[till[0]] || !history[till[0]].ops[till[1]]) {
      throw new Error("The till is not valid: " + JSON.stringify(till));
    }

    const sliceBatch = history.slice(0, till[0] + 1);
    const lastBatch = sliceBatch[sliceBatch.length - 1];
    const correctLastBatch = {
      ...lastBatch,
      ops: lastBatch.ops.slice(0, till[1] + 1),
    };

    sliceBatch.pop();
    sliceBatch.push(correctLastBatch);

    return sliceBatch;
  },

  /**
   * Checks if the editor is HistoryEditor
   */

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isHistoryEditor(editor: any): editor is HistoryEditor {
    const { history } = editor;

    if (history) {
      return true;
    } else {
      return false;
    }
  },
};
