import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export class SlateEditorErrorBoundry extends React.Component<Props, State> {
  constructor(Props: Props) {
    super(Props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(error: unknown) {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error(error);
    this.setState({ hasError: false });
  }

  render() {
    if (this.state.hasError) {
      return <h1>There is an error</h1>;
    }
    return this.props.children;
  }
}
