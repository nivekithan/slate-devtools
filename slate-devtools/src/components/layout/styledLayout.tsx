import { styled } from "../../styles/stitches.config";

export const StyledLayout = styled("div", {
  $reset: "",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#282a36",
  color: "white",

  ".row-1": {
    $reset: "",
    height: "40px",
    display: "flex",
    alignItems: "center",
  },

  ".row-2": {
    $reset: "",
    display: "flex",
    height: "calc(100% - 90px)",
    justifyContent: "space-between",
    padding: "0.75rem",

    "& > div": {
      $reset: "",
      height: "100%",
      overflow: "auto",

      "&:first-child": {
        flex: "1 1 0%",
      },
    },
  },

  ".row-3": {
    $reset: "",
    height: "50px",
  },

  "& ::-webkit-scrollbar": {
    width: "5px",
  },

  "& ::-webkit-scrollbar-track": {
    backgroundColor: "#282a36",
  },

  "& ::-webkit-scrollbar-thumb": {
    backgroundColor: "#44475a",
    borderRadius: "20px",
  },

  "& ::-webkit-scrollbar-corner": {
    backgroundColor: "transparent",
  },
});
