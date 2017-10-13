import React from "react";

import PlayerImg   from "./PlayerImg";
import PlayerInfo  from "./PlayerInfo";
import PlayerStats from "./PlayerStats";


import "./Header.css";

class Header extends React.Component {

  render() {
    const {t} = this.props;
    return (
      <div className="Profile__Header">
        <div className="wrap">
          <div className="Profile__Header-Wrap">

            <PlayerImg />

            <PlayerInfo t={t}/>

            {/* <PlayerStats2 t={t} /> */}
            {/* <PlayerStats t={t} /> */}
            
            
          </div>
        </div>
      </div>
    );
  }
}

export default Header;