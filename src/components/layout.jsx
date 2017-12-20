import React from "react";
import {Helmet} from "react-helmet";

import Header from "./Layout/Header";
import Sidebar from "./Layout/Sidebar";
import Footer from "./Layout/Footer";

import Routers from "./routers";

import "./common/animate.css";

import "./layout.css";

const contentStyle = {
  flex: 1
}


class Layout extends React.Component {
  render() {
    return (
      <div className="Layout">
        <Helmet titleTemplate="%s - VGPRO.gg">
          <title>Loading</title>
        </Helmet>

        {/* <Header/> */}
        <div className="Layout-sidebar">
          <Sidebar />
        </div>
        <div className="Layout-main">
          <div className="Header-BG" />
          <div className="Layout-content"><Routers/></div>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default Layout;
