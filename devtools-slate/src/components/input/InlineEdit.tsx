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
    boxShadow: "rgb(12, 45, 107) 0px 0px 0px 3px",
    border: "1px solid rgb(56, 139, 253)",
    padding: "0.20rem",
  },
});
