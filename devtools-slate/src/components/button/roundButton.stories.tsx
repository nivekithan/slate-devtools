import React from "react";
import { Meta, Story } from "@storybook/react";
import { RoundButton, RoundButtonProps } from "./roundButton";

export default {
  title: "Component/Button/Round Button",
  component: RoundButton,
  parameters: {
    backgrounds: {
      default: "white",
    },
  },
} as Meta;

const Template: Story<RoundButtonProps> = (props) => <RoundButton {...props} />;

export const Positioned = Template.bind({});
Positioned.args = {
  children: "Open",
  size: "50px",
};
