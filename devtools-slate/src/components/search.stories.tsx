import React from "react";
import { Meta, Story } from "@storybook/react";
import { Search as Se, SearchProps } from "./search";

export default {
  title: "Component/Search",
  component: Se,
} as Meta;

const Template: Story<SearchProps> = (props) => (
  <div>
    <Se {...props} />
  </div>
);

export const Search = Template.bind({});
Template.args = {
  startValue: "[ ]",
};
