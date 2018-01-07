import React    from "react";
import {Helmet} from "react-helmet";
import ReactGA  from "react-ga";

import Header from "./Layout/Header";
// import Sidebar from "./Layout/Sidebar";
import Footer from "./Layout/Footer";

import Routers from "./routers";

import Ads           from "./common/Ads";
import ErrorBoundary from "./common/ErrorBoundary";

import "./common/animate.css";

import "./theme.default.css";

import "./layout.css";

ReactGA.initialize('UA-93754104-1');

class Layout extends React.Component {

  render() {
    return (
      <div className="Layout theme-dark">
        <ErrorBoundary>
          <Helmet titleTemplate="%s - VGPRO.gg">
            <title>Loading</title>
          </Helmet>
          <Header />
          {/* <div className="Layout-sidebar">
            <Sidebar />
          </div> */}
          <div className="Layout-main">
            <div className="Layout-BG" />
            <div className="Layout-content"><Routers/></div>
            <Ads />
            <Footer/>
          </div>
        </ErrorBoundary>
      </div>
    );
  }
}

export default Layout;
