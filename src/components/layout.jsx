import React from "react";

import Header from "./Layout/Header";
import Footer from "./Layout/Footer";

import Routers from "./routers";

class Layout extends React.Component {
  render() {
    return (
     <div>
      <Header/>
      <Routers/>
      <Footer/>
     </div>
    );
  }
}

export default Layout;
