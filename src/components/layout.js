import React    from "react";
import {Helmet} from "react-helmet";
import ReactGA  from "react-ga";

import Header from "./Layout/Header";
import Footer from "./Layout/Footer";

import Routers from "./routers";

import Ads           from "./common/Ads";
import ErrorBoundary from "./common/ErrorBoundary";

import "./common/animate.style.js";

import * as Styled from "./layout.style";

ReactGA.initialize('UA-93754104-1');

class Layout extends React.Component {

  render() {
    return (
      <Styled.Wrap>
        <ErrorBoundary>
          <Helmet titleTemplate="%s - VGPRO.gg">
            <title>Loading</title>
          </Helmet>
          <Header />
          <Styled.Main>

            <Styled.Background/>

            <Styled.Content>
              <Routers/>
            </Styled.Content>

            <Ads />

            <Footer/>

          </Styled.Main>
        </ErrorBoundary>
      </Styled.Wrap>
    );
  }
}

export default Layout;
