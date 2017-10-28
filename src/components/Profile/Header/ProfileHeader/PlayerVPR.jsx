import React from "react";

import "./PlayerVPR.css";

const PlayerVPR = ({t}) => {
  return (
    <div className="Profile__Header-VPR">

      <div className="Profile__VPR-Stat VPR">
        <div>2,381</div>
        <span>VGPRO RATING <br /> VPR </span>
      </div>

      <div className="Profile__VPR-desc mobile">
        #32 Global | #1 NA
      </div>

      <div className="Profile__VPR-Stat">
        <div>#3232</div>
        <span>NA</span>
      </div>

      <div className="Profile__VPR-Stat">
        <div>#1</div>
        <span>Global</span>
      </div>
    </div>
  )
}

export default PlayerVPR;