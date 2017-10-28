import React from "react";

import PlayerImg   from "./ProfileHeader/PlayerImg";
import PlayerInfo  from "./ProfileHeader/PlayerInfo";
import PlayerVPR   from "./ProfileHeader/PlayerVPR";
// import PlayerStats from "./PlayerStats";


import "./ProfileHeader.css";

class ProfileHeader extends React.Component {

  render() {
    const {t} = this.props;
    return (
      <div className="Profile__Header">
        <div className="wrap Profile__Header-Wrap">

          <PlayerImg />

          <PlayerInfo t={t}/>

          <PlayerVPR t={t} />

          {/* <PlayerStats2 t={t} /> */}
          {/* <PlayerStats t={t} /> */}
          
        </div>
      </div>
    );
  }
}

export default ProfileHeader;