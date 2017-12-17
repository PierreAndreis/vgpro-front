import React from "react";
import {Helmet} from "react-helmet";

import Header from "./Layout/Header";
import Footer from "./Layout/Footer";

import Routers from "./routers";

import "./common/animate.css";

/** small hack so footer is always at bottom */
const style = {
  position: "relative",
  height: "100%",
  display: "flex",
  flexDirection: "column",
}

const contentStyle = {
  flex: 1
}


class Layout extends React.Component {
  render() {
    return (
     <div style={style}> 
        <Helmet titleTemplate="%s - VGPRO.gg">
          <title>Loading</title>
        </Helmet>
        <div className="Header-BG" />
        <Header/>
        <div style={contentStyle}><Routers/></div>
        <Footer/>
     </div>
    );
  }
}

export default Layout;
