import React from "react";
import {Helmet} from "react-helmet";
import {Adsense} from "./../common/Ads";

import ProFeed from "./ProFeed";
import Lead5   from "./Lead5";
import Heroes   from "./Heroes";
import SearchPlayer from "./../common/SearchPlayer.jsx";
import "./Home.css";

import axios from "axios";


class HomePage extends React.Component {

  state = {country: null}

  componentWillMount() {
    axios.get('http://freegeoip.net/json/').then(response => {
      this.setState({country: response.data.country_code});
    });
  }

  render() {
    const { t } = this.props;

    return (
      <div className="wrap">
        <Helmet titleTemplate="">
          <title>VGPRO.gg</title>
        </Helmet>
        <div className="Home-logo">
          <div className="logo">
            <div className="img" />
          </div>
          <SearchPlayer mode="main" />
        </div>
        <Adsense />
          {
            (this.state.country === "US") &&
              (
                <div style={{textAlign: "center"}}>
                  <a href="http://bit.ly/2Ec3kRF" target="_blank" rel="noopener noreferrer">
                    <img src="https://vgy.me/ytc2rj.jpg" alt="ytc2rj.jpg" />
                  </a>
                </div>
              )
          }
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
