import React, { Component } from "react";

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);
      window.scrollTo(0, 0);
      this.state = {
        component: null
      };
    }

    componentDidUpdate(prevProps) {
      if (this.props.location.pathname !== prevProps.location.pathname) {
        window.scrollTo(0, 0);
      }
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component: component
      });
    }

    render() {
      const C = this.state.component;
      if (C) return <C {...this.props} />;
      return (
      <div className="Loading-Page"><div className="loader" /></div>
      )
    }
  }

  return AsyncComponent;
}