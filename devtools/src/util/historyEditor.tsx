import { Operation } from "slate";
import { ReactEditor } from "slate-react";

export type Batch = {
  normalizing: boolean;
  data: Operation[];
};

export type HistoryEditor = {
  history: Batch[];
  isNormalizing: boolean;
  shouldSave: boolean;
};

type Location = [number, number];

type HistoryOptions = {
  from: Location;
  to: Location;
  mode?: "top-bottom" | "bottom-top" | "auto";
  match?: (loc: Location, op: Operation) => boolean;
};

export const HistoryEditor = {
  withoutSave(editor: HistoryEditor, callback: () => unknown) {
    editor.shouldSave = false;
    callback();
    editor.shouldSave = true;
  },

  *operations(editor: HistoryEditor, options: HistoryOptions) {
    const { history } = editor;
    const {
      from: [fromBatch, fromOp],
      to: [toBatch, toOp],
    } = options;

    let { mode = "auto", match = () => true } = options;

    if (mode === "auto") {
      if (fromBatch > toBatch) {
        mode = "bottom-top";
      } else if (fromBatch < toBatch) {
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
        const operations = history[i].data;

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
              if (j < fromOp) {
                continue;
              }
            } else {
              if (j > fromOp) {
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
              if (j >= toOp) {
                break;
              }
            } else {
              if (j <= toOp) {
                break;
              }
            }
          }

          const operation = operations[j];

          if (operation) {
            if (match([i, j], operation)) {
              yield operation;
            }
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


};
