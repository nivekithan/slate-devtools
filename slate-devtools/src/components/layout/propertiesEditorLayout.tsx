import { styled } from "../../styles/stitches.config";

export const PropertiesEditorLayout = styled("div", {
  $reset: "",
  display: "flex",
  flexDirection: "column",
  rowGap: "1rem",
  fontSize: "0.875rem",
  padding: "0.5rem",
  marginLeft: "1.25rem",

  "& > div": {
    $reset: "",

    "&:first-child": {
      display: "flex",
      justifyContent: "flex-end",
    },
    "&:nth-child(2)": {
      display: "grid",
      gridTemplateColumns: "100px 2px 1fr 20px",
      columnGap: "0.5rem",
      placeItems: "center start",
      gridAutoRows: "1.70rem",
    },
  },
});
