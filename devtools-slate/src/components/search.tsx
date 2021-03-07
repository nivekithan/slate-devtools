import React from "react";
import { useFormInputs } from "../hooks/useFormInputs";

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
      <div className="font-semibold text-green-500 ">Search by path : </div>
      <form className="flex gap-x-2" onSubmit={onFormSubmit}>
        <input
          type="text"
          className="bg-hex-0F0F0F px-2 py-1 rounded "
          placeholder="JSON string"
          value={inputValue}
          onChange={onChangeUpdateInput}
        />
        <input
          type="submit"
          className="bg-blue-600 rounded text-sm px-2 cursor-pointer hover:bg-blue-500"
          value="Search"
        />
      </form>
    </div>
  );
};
