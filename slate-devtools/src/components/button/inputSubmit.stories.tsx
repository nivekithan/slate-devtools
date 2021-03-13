import React from "react";
import { Meta, Story } from "@storybook/react";
import { InputSubmit, InputProps } from "./inputSubmit";

export default {
  title: "Component/Button/Input",
  component: InputSubmit,
} as Meta;

const Template: Story<InputProps> = (props) => <InputSubmit {...props} />;

export const Normal = Template.bind({});
Normal.args = {
  children: "Run",
  color: "blue",
};
