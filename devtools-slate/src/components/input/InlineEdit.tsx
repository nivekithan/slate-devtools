import { styled } from "../../styles/stitches.config";

export const InlineEdit = styled("input", {
  $reset: "",
  backgroundColor: "inherit",
  width: "100%",
  color: "white",
  padding: "0.25rem",
  borderRadius: "5px",

  "&:focus": {
    backgroundColor: "$bgInput",
    $focus: "",
    padding: "0.20rem",
  },
});
