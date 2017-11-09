import React from "react";

const RecentPlayedWith = ({t}) => (
  <div>
    <div className="recent_played">
      <a href="' + fun.baseurlp + fun.region + '/' + key + '" target="_self">
        <div className="recent_played_each">
          <div className="recent_played_name">4ever</div>
          <div className="recent_played_win">2W</div>
          <div className="recent_played_loss">1L</div>
          <div className="recent_played_winrate" id="' + style + '">15%</div>
          <div className="recent_played_games">144 {t(`sidebar-played`)}</div>
        </div>
      </a>
    </div>
    <br/>
    <div className="view_morediv">
      <div className="view_more" id="recent">{t("view-more")}</div>
      <div
        className="view_more"
        id="recentreset"
        style={{
        display: "none"
      }}>
        {t("view-less")}
      </div>
    </div>
    <br/>
  </div>
);

export default RecentPlayedWith;