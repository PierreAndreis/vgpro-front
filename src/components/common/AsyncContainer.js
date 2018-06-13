import React, { Component } from "react";
import Spinner from "react-spinkit";

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null,
      };
    }

    componentWillMount() {
      if (this.props.location) {
        window.scrollTo(0, 0);
      }
    }

    componentDidUpdate(prevProps) {
      if (
        this.props.location &&
        this.props.location.pathname !== prevProps.location.pathname
      ) {
        window.scrollTo(0, 0);
      }
    }

    async componentDidMount() {
      const { default: component } = await importComponent();
      this.setState({
        component: component,
      });
    }

    render() {
      const C = this.state.component;
      if (C) return <C {...this.props} />;
      return (
        <div className="Loading-Page">
          <div
            style={{
              width: "1px",
              height: "1px",
              margin: "5% auto",
            }}
          >
            <Spinner
              name="line-spin-fade-loader"
              color="rgba(0, 0, 0, 0.2)"
              fadeIn="none"
            />
          </div>
        </div>
      );
    }
  }

  return AsyncComponent;
}
