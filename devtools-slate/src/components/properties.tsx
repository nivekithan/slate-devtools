import { Node, Path } from "slate";
import React from "react";
import { Resizable } from "re-resizable";
import { GreenLabel } from "./greenLabel";
import { RenderPath } from "./path";
import { css } from "../styles/stitches.config";

/**
 * For keys I am using the index of array. But I dont think it will lead to any problems in
 * this case
 */

type Props = {
  properties: Partial<Node>;
  path: Path;
  left?: boolean;
  right?: boolean;
};

export const Properties = ({
  properties,
  path,
  left = false,
  right = false,
}: Props) => {
  return (
    <Resizable
      className={css({
        $reset: "",
        border: "1px solid white",
        display: "inline-flex",
        borderRadius: "10px",
        height: "100%",
      })()}
      defaultSize={{ width: "120px", height: "auto" }}
      maxWidth="100%"
      enable={{ left, right }}
    >
      <div
        className={css({
          $reset: "",
          display: "inline-flex",
          flexDirection: "column",
          width: "100%",
          rowGap: "0.25rem",
          padding: "0.5rem",
          alignItems: "center",
        })()}
      >
        <div
          className={css({
            $flex: "",
            columnGap: "0.5rem",
          })()}
        >
          <GreenLabel>{`Path :`}</GreenLabel>
          <RenderPath path={path} />
        </div>
        <div
          className={css({
            $reset: "",
            display: "flex",
            flexDirection: "column",
            rowGap: "0.25rem",
            width: "100%",
            fontSize: "0.75rem",
          })()}
        >
          {Object.keys(properties).map((val, i) => {
            return (
              <div
                className={css({
                  $reset: "",
                  display: "flex",
                  columnGap: "0.25rem",
                })()}
                key={i}
              >
                <div
                  className={css({
                    $truncate: "",
                  })()}
                >
                  {val}{" "}
                </div>
                <div>:</div>
                <div className={css({ $truncate: "" })()}>
                  {JSON.stringify(properties[val])}{" "}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Resizable>
  );
};
