import React from "react";

import "./PlayerInfo.css";

const PlayerInfo = ({t}) => {
  return (
    <div className="Profile__Header-Info">

      <div className="Profile__Title">
        <span>Hey hey <i className="fa fa-close" /></span>
      </div>

      <div className="Profile__Info">
        <div className="Profile__Info-Name">DNZio</div>
        <div className="Profile__Info-Team">
          <span className="team_name">%teamname%</span>
          |{" "}
          <span className="team_role">
            <span>{t('captain')}</span>
          </span>
          <br/>
          <span className="from">%from%
            <span className='flag-icon flag-icon-us'></span>
          </span>
        </div>
      </div>
      
      <div className="update" data-tooltip="Every 10-20 minutes">
        {t("last-update")}
        {" "}
        Loading
      </div>

      <div className="Profile__Desc">
        <h3>{t("most-played-heroes")}</h3>
        <div className="heroes_img" style={{backgroundImage: "url(http://vgpro.gg/assets/images/heroes/adagio.gif)"}}/>
        <div className="heroes_img" style={{backgroundImage: "url(http://vgpro.gg/assets/images/heroes/adagio.gif)"}}/>
        <div className="heroes_img" style={{backgroundImage: "url(http://vgpro.gg/assets/images/heroes/adagio.gif)"}}/>
        <div className="heroes_img" style={{backgroundImage: "url(http://vgpro.gg/assets/images/heroes/adagio.gif)"}}/>
        <div className="heroes_img" style={{backgroundImage: "url(http://vgpro.gg/assets/images/heroes/adagio.gif)"}}/>

        <h3>{t("recent-results")}</h3>
        <div className="match_result" id="d"></div>
        <div className="match_result" id="v"></div>

      </div>
    </div>
  )
}

export default PlayerInfo;