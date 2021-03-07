import React, { useState } from "react";

export const useFormInputs = <T extends HTMLInputElement | HTMLTextAreaElement>(
  defaultValue: string
): [
  string,
  (e: React.ChangeEvent<T>) => void,
  React.Dispatch<React.SetStateAction<string>>
] => {
  const [inputValue, setInputValue] = useState<string>(defaultValue);

  const onChange = (e: React.ChangeEvent<T>) => {
    e.preventDefault();
    setInputValue(e.currentTarget.value);
  };

  return [inputValue, onChange, setInputValue];
};
