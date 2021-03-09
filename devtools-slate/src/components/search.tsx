import React from "react";
import { InputSubmit } from "./button";
import { useFormInputs } from "../hooks/useFormInputs";
import { GreenLabel } from "./greenLabel";

type Props = {
  startValue?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>, value: string) => boolean;
};

export const Search = ({ startValue = '""', onSubmit }: Props) => {
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
    <div className="flex gap-x-3 items-center text-sm">
      <GreenLabel>Search by Path :</GreenLabel>
      <form className="flex gap-x-2" onSubmit={onFormSubmit}>
        <input
          type="text"
          className="bg-hex-0F0F0F px-2 py-1 rounded "
          placeholder="JSON string"
          value={inputValue}
          onChange={onChangeUpdateInput}
        />
        <InputSubmit color="blue">Search</InputSubmit>
      </form>
    </div>
  );
};
