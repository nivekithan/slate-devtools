import React from "react";
import { Meta, Story } from "@storybook/react";
import { AddProperties } from "./addProperties";

export default {
  title: "Component/Add Properties",
  component: AddProperties,
} as Meta;

const Template: Story<Record<string, never>> = (props) => (
  <div style={{ color: "white", display: "grid", placeItems: "center" }}>
    <AddProperties {...props} />
  </div>
);

export const Normal = Template.bind({});
