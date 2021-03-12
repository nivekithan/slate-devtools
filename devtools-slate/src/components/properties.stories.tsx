import React from "react";
import { Meta, Story } from "@storybook/react";
import { Properties, PropertiesProps } from "./properties";

export default {
  title: "Component/ Properties",
  component: Properties,
} as Meta;

const Template: Story<PropertiesProps> = (props) => (
  <div style={{ color: "white" }}>
    <Properties {...props} />
  </div>
);

export const Right = Template.bind({});
Right.args = {
  right: true,
  path: [1, 3, 6],
  properties: {
    devtools_id: "adfadfadfadf",
    number: 23,
    depth: "3",
  },
};

export const Left = Template.bind({});
Left.args = {
  ...Right.args,
  left: true,
  right: false,
};
