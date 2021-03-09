import React from "react";
import { Meta, Story } from "@storybook/react";
import { GreenLabel, GreenLabelProps } from "./greenLabel";

export default {
  title: "Component/Text/Green Label",
  component: GreenLabel,
} as Meta;

const Template: Story<GreenLabelProps> = (props) => <GreenLabel {...props} />;

export const Normal = Template.bind({});
Normal.args = {
  children: "Selected Path",
};
