import React from "react";

import "./PlayerInfo.css";

const PlayerInfo = ({t}) => {
  return (
    <div className="Profile__Header-Info">

      <div className="Profile__Header-Name">StartingAllOver</div>
      <div className="Profile__Header-Region" data-tooltip="Something Something">North America (?)</div>
      
      <div className="Profile__Header-update">
        {t("last-update")}
        {" "}
        Loading
      </div>

      {/* <div className="Profile__Desc">
        <h3>{t("most-played-heroes")}</h3>
        <div className="heroes_img" style={{backgroundImage: "url(http://vgpro.gg/assets/images/heroes/adagio.gif)"}}/>
        <div className="heroes_img" style={{backgroundImage: "url(http://vgpro.gg/assets/images/heroes/adagio.gif)"}}/>
        <div className="heroes_img" style={{backgroundImage: "url(http://vgpro.gg/assets/images/heroes/adagio.gif)"}}/>
        <div className="heroes_img" style={{backgroundImage: "url(http://vgpro.gg/assets/images/heroes/adagio.gif)"}}/>
        <div className="heroes_img" style={{backgroundImage: "url(http://vgpro.gg/assets/images/heroes/adagio.gif)"}}/>

        <h3>{t("recent-results")}</h3>
        <div className="match_result" id="d"></div>
        <div className="match_result" id="v"></div>

      </div> */}
    </div>
  )
}

export default PlayerInfo;