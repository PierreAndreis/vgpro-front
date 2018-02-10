import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    global.Raven.captureException(error, { extra: errorInfo });
    global.Raven.showReportDialog();
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <React.Fragment>
          <div>Something went wrong!</div>
        </React.Fragment>
      );
    }
    else return this.props.children;
  }
}

export default ErrorBoundary;