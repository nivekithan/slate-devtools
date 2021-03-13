import { createCss } from "@stitches/react";

export const { styled, css } = createCss({
  utils: {
    $reset: () => () => ({
      outline: "none",
      fontSize: "inherit",
      fontWeight: "inherit",
      color: "inherit",
      fontFamily:
        "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol,Noto Color Emoji",
      border: "none",
      WebkitAppearance: "none",
      appearance: "none",
      boxSizing: "border-box",
      padding: "0px",
      margin: "0px",
      backgroundColor: "inherit",
    }),
    $gridCenter: () => () => ({
      display: "grid",
      placeItems: "center",
    }),
    $flex: () => () => ({
      display: "flex",
      alignItems: "center",
    }),
    $truncate: () => () => ({
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    }),
    $focus: () => () => ({
      boxShadow: "rgb(12, 45, 107) 0px 0px 0px 3px",
      border: "1px solid rgb(56, 139, 253)",
    }),
  },
  theme: {
    colors: {
      bg: "rgb(39,41,53)",
      bgScriptEditor: "rgb(17,18,25)",
      bgInput: "rgba(13, 17, 23, 0.3)",
      buttonBlue: "rgb(36,99,235)",
      buttonBlueHover: "rgb(60,131,246)",
      buttonRose: "rgb(226,29,72)",
      buttonRoseHover: "rgb(244,62,92)",
      buttonRed: "rgb(220,40,40)",
      buttonRedHover: "rgb(239,67,67)",
      buttonGray: "rgb(75,85,99)",
      buttonGreen: "rgb(14,116,144)",
      batchNormalizing: "rgb(99,102,241)",
      batchOperations: "rgb(88,28,135)",
      operationHere: "rgb(67,56,202)",
      textOperationBlue: "rgb(191,219,254)",
      textPropertiesBlue: "rgb(59,130,246)",
    },
  },
});
