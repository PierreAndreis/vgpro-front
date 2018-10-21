import React from "react";
import * as Sentry from "@sentry/browser";

const styles = {
  container: {
    display: "flex",
    height: "90vh",
    paddingTop: "10vh",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  inner: {
    width: 200,
  },
  img: {
    width: "100px",
  },
  paragraph: {
    textAlign: "center",
  },
  button: {
    backgroundColor: "white",
    border: "1px solid grey",
    borderRadius: "5px",
    padding: "10px 20px",
  },
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }

  render() {
    if (this.state.error) {
      //render fallback UI
      return (
        <div style={styles.container}>
          <div style={styles.inner}>
            <img
              src={"/images/logo_badge.svg"}
              style={styles.img}
              alt="logo"
            />
            <p style={styles.paragraph}>An error occurred.</p>
            <p style={styles.paragraph}>
              Our dev team has been notified automatically.
            </p>
            <button
              onClick={() => Sentry.showReportDialog()}
              style={styles.button}
            >
              Report feedback
            </button>
          </div>
        </div>
      );
    }
    //when there's not an error, render children untouched
    return this.props.children;
  }
}

export default ErrorBoundary;
