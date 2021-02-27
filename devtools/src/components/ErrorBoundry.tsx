import React, { ReactNode } from "react";
import { Node } from "slate";
import { Editable, ReactEditor } from "slate-react";

type Props = {
  children: ReactNode;
  value: Node[];
};

type State = {
  hasError: boolean;
};

export class SlateEditorErrorBoundry extends React.Component<Props, State> {
  constructor(Props: Props) {
    super(Props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    // window.location.reload();
    console.error(error);
    // console.log(this.props.value);
    // console.error(error.stack)
    this.setState({ hasError: false });
  }

  render() {
    if (this.state.hasError) {
      return <h1>There is an error</h1>;
    }
    return this.props.children;
  }
}
