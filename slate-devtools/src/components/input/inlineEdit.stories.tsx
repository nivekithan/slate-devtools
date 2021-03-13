import React from "react";
import { Meta, Story } from "@storybook/react";
import { InlineEdit } from "./InlineEdit";
import { useFormInputs } from "../../hooks/useFormInputs";

export default {
  title: "Component/Input",
  component: InlineEdit,
} as Meta;

type InlineEditTemplateProps = {
  value: string;
};

const InlineEditTemplate = ({ value }: InlineEditTemplateProps) => {
  const [formValue, onChange] = useFormInputs<HTMLInputElement>(value);

  return <InlineEdit value={formValue} onChange={onChange}></InlineEdit>;
};

const Template: Story<InlineEditTemplateProps> = (props) => (
  <div style={{ width: "145px" }}>
    <InlineEditTemplate {...props} />
  </div>
);

export const ChangeBackground = Template.bind({});
ChangeBackground.args = {
  value: "Checking",
};
