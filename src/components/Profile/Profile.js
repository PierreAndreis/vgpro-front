import React from "react";
import { withRouter } from 'react-router';

import Header    from "./Header/ProfileHeader";
import MatchStats from "./MatchStats/MatchStats";

import Sidebar from "./Sidebar";
import MatchFilter from "./MatchFilter";

import MatchesManager from "./Matches/MatchesManager";


import "./Profile.css";
import "./profile.base.css";
import "./profile.resp.css";

class Profile extends React.Component {
  render() {

    const {t} = this.props;
    // const {player} = match;

    return (
      <div>
        <Header t={t} />
        <div className="wrap Profile-wrap">

          <div className="Profile__Sidebar">
          <Sidebar t={t}/>
          </div>
          <div className="Profile__Main">
            <MatchStats t={t} />
            <MatchFilter t={t} />

            <MatchesManager t={t} />
          </div>
        </div>
        </div>
    );
  }
}

export default withRouter(Profile);
