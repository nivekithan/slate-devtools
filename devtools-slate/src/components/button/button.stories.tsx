import React from "react";
import { Meta, Story } from "@storybook/react";
import { Button, ButtonProps } from "./button";

export default {
  title: "Component/Button/Button",
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (props) => <Button {...props} />;

export const Normal = Template.bind({});
Normal.args = {
  children: "Update",
  color: "rose",
};
