import React from "react";
import { Helmet } from "react-helmet";
import { Adsense } from "./../common/Ads";

import ProFeed from "./ProFeed";
import Lead5 from "./Lead5";
import Heroes from "./Heroes";
import SearchPlayer from "./../common/SearchPlayer";

import * as Styled from "./Home.style.js";

class HomePage extends React.Component {

  render() {
    const { t } = this.props;

    return (
      <div className="wrap">
        <Helmet titleTemplate="">
          <title>VGPRO.gg</title>
        </Helmet>
        <div>
          <Styled.Logo>
            <div className="img" />
          </Styled.Logo>
          <SearchPlayer mode="main" />
        </div>
        <Adsense />

        <Styled.Content>
          <ProFeed t={t} />
          <Lead5 t={t} />
          <Heroes t={t} />
        </Styled.Content>
        
      </div>
    );
  }
}

export default HomePage;
