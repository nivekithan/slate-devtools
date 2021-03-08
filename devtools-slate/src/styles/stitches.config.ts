import { createStyled } from "@stitches/react";

export const { styled, css } = createStyled({
  utils: {
    $reset: () => () => ({
      outline: "none",
      fontSize: "inherit",
      fontWeight: "inherit",
      color: "inherit",
      fontFamily:
        "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol,Noto Color Emoji",
      border: "none",
      backgroundColor: "transparent",
      WebkitAppearance: "none",
      appearance: "none",
      boxSizing: "border-box",
    }),
    $gridCenter: () => () => ({
      display: "grid",
      placeItems: "center",
    }),
  },
});
