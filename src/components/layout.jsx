import React    from "react";
import {Helmet} from "react-helmet";
import ReactGA  from "react-ga";
import AD from 'react-google-publisher-tag';


import Header from "./Layout/Header";
// import Sidebar from "./Layout/Sidebar";
import Footer from "./Layout/Footer";

import Routers from "./routers";

import ErrorBoundary from "./common/ErrorBoundary";

import "./common/animate.css";
import "./layout.css";

ReactGA.initialize('UA-93754104-1');

class Layout extends React.Component {

  render() {
    return (
      <div className="Layout">
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
            <AD path="/21676119576/vgpro-react" />
            <Footer/>
          </div>
        </ErrorBoundary>
      </div>
    );
  }
}

export default Layout;
