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
  },
});
