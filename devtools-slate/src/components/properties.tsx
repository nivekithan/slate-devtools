import { Node, Path } from "slate";
import React from "react";
import { Resizable } from "re-resizable";
import { GreenLabel } from "./greenLabel";
import { RenderPath } from "./path";
import { css, styled } from "../styles/stitches.config";

/**
 * For keys I am using the index of array. But I dont think it will lead to any problems in
 * this case
 */

export type PropertiesProps = {
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
}: PropertiesProps) => {
  return (
    <Resizable
      className={resizableClassName()}
      defaultSize={{ width: "120px", height: "auto" }}
      maxWidth="100%"
      enable={{ left, right }}
    >
      <StyledProperties>
        <div>
          <GreenLabel>{`Path :`}</GreenLabel>
          <RenderPath path={path} />
        </div>
        <div>
          {Object.keys(properties).map((val, i) => {
            return (
              <div className="devtools_slate_contanier" key={i}>
                <div className="devtools_slate_truncate">{val} </div>
                <div>:</div>
                <div className="devtools_slate_truncate">
                  {JSON.stringify(properties[val])}{" "}
                </div>
              </div>
            );
          })}
        </div>
      </StyledProperties>
    </Resizable>
  );
};

const resizableClassName = css({
  $reset: "",
  border: "1px solid white",
  display: "inline-flex",
  borderRadius: "10px",
  height: "100%",
});

const StyledProperties = styled("div", {
  $reset: "",
  display: "inline-flex",
  flexDirection: "column",
  width: "100%",
  rowGap: "0.25rem",
  padding: "0.5rem",
  alignItems: "center",

  "& > div": {
    $reset: "",

    "&:first-child": {
      $flex: "",
      columnGap: "0.5rem",
    },

    "&:nth-child(2)": {
      display: "flex",
      flexDirection: "column",
      rowGap: "0.25rem",
      width: "100%",
      fontSize: "0.75rem",

      "& > .devtools_slate_contanier": {
        $reset: "",
        display: "flex",
        columnGap: "0.25rem",
      },

      "& .devtools_slate_truncate": {
        $truncate: "",
      },
    },
  },
});
