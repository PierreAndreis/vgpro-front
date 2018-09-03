import React from "react";
import { Helmet } from "react-helmet";
import ReactGA from "react-ga";

import Header from "./Layout/Header";
import Footer from "./Layout/Footer";

import Routers from "./routers";
import ErrorBoundary from "./common/ErrorBoundary";

import "./common/animate.style.js";

import * as Styled from "./layout.style";

ReactGA.initialize("UA-93754104-1");

class Layout extends React.Component {
  render() {
    const title = (
      <Helmet titleTemplate="%s - VGPRO.gg">
        <title>Vainglory Stats</title>
      </Helmet>
    );

    if (window.location.pathname.includes("/widget/")) {
      return <Routers />;
    }

    return (
      <Styled.Wrap>
        <ErrorBoundary>
          {title}
          <Header />
          <Styled.Main>
            <Styled.Background />

            <Styled.Content>
              <Routers />
            </Styled.Content>

            <Footer />
          </Styled.Main>
        </ErrorBoundary>
      </Styled.Wrap>
    );
  }
}

export default Layout;
