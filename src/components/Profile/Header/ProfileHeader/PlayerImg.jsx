import React from "react";

import "./PlayerImg.css";

const PlayerImg = () => {
  return (
    <div className="Profile__PlayerImg">

    <div className="Profile__PlayerImg-Tier">

      {/* <div className="tier" style={{backgroundImage: "url(http://vgpro.gg/assets/images/skilltier/31.png)"}} /> */}
      
      <div className="pro"  style={{backgroundImage: "url(http://vgpro.gg/assets/players_pics/DNZio.png)"}} />

    </div>

  </div>
  )
}

export default PlayerImg;