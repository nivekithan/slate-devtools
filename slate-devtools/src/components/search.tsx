import React from "react";
import { InputSubmit } from "./button";
import { useFormInputs } from "../hooks/useFormInputs";
import { GreenLabel } from "./greenLabel";
import { InlineEdit } from "./input";
import { styled } from "../styles/stitches.config";

export type SearchProps = {
  startValue?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>, value: string) => boolean;
};

export const Search = ({ startValue = '""', onSubmit }: SearchProps) => {
  const [
    inputValue,
    onChangeUpdateInput,
    setInputValue,
  ] = useFormInputs<HTMLInputElement>(startValue);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit(e, inputValue)) {
      setInputValue(startValue);
    }
  };

  return (
    <SearchStyled>
      <GreenLabel>Search by Path :</GreenLabel>
      <form onSubmit={onFormSubmit}>
        <InlineEdit
          value={inputValue}
          css={{ background: "$bgInput" }}
          onChange={onChangeUpdateInput}
        />
        <InputSubmit color="blue">Search</InputSubmit>
      </form>
    </SearchStyled>
  );
};

const SearchStyled = styled("div", {
  $reset: "",
  display: "flex",
  columnGap: "0.75rem",
  alignItems: "center",
  fontSize: "0.875rem",

  "& > form": {
    $reset: "",
    display: "flex",
    columnGap: "0.5rem",
  },
});
