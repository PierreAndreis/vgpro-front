import React from "react";

import PlayerImg   from "./ProfileHeader/PlayerImg";
import PlayerInfo  from "./ProfileHeader/PlayerInfo";
import PlayerVPR   from "./ProfileHeader/PlayerVPR";
// import PlayerStats from "./PlayerStats";

import { connect }          from "react-redux";

import "./ProfileHeader.css";

class ProfileHeader extends React.Component {

  render() {
    const {t, status, playerStats} = this.props;

    const passProps = {
      status,
      data: playerStats,
      t,
    }

    return (
      <div className="Profile__Header">
        <div className="wrap Profile__Header-Wrap">
          <PlayerImg {...passProps} />
          <PlayerInfo {...passProps} />
          <PlayerVPR {...passProps} />
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {

  return {
    ...state.playerStats
  }
}

export default connect(
  mapStateToProps
)(ProfileHeader);