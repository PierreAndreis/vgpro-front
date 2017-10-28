import React from "react";

import Header from "./Layout/Header";
import Footer from "./Layout/Footer";

import Routers from "./routers";

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
        <div className="Header-BG" />
        <Header/>
        <div style={contentStyle}><Routers/></div>
        <Footer/>
     </div>
    );
  }
}

export default Layout;
