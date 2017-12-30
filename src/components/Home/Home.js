import React from "react";
import {Helmet} from "react-helmet";
import Ads from "./../common/Ads";

import ProFeed from "./ProFeed";
import Lead5   from "./Lead5";
import Heroes   from "./Heroes";
import SearchPlayer from "./../common/SearchPlayer.jsx";
import "./Home.css";


class HomePage extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <div className="wrap">
        <Helmet titleTemplate="">
          <title>VGPRO.gg</title>
        </Helmet>
        <div className="Home-logo animated fadeInDown">
          <div className="logo">
            <div className="img" />
          </div>
          <SearchPlayer mode="main" />
        </div>
        <Ads />
        <div className="Home-box">
          <ProFeed t={t} />
          <Lead5   t={t} />
          <Heroes  t={t} />
        </div>
      </div>
    );
  }
}

export default HomePage;
