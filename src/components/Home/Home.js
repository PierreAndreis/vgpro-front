import React from "react";

import ProFeed from "./ProFeed";
import Lead5   from "./Lead5";
import Heroes   from "./Heroes";

import "./Home.css";


class HomePage extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <div className="content">
        <div className="wrap">
        <ProFeed t={t} />
        <Lead5   t={t} />
        <Heroes  t={t} />
        </div>
      </div>
    );
  }
}

export default HomePage;
