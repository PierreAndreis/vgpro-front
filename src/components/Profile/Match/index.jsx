import React from "react";



class Match extends React.Component {


  render() {
    return (
      <div className="each_match" data-gohero="' + matchdata.actor + '">
      <div className="match_history_box" data-gohero="' + matchdata.actor + '" data-id="' + matchdata.MId + '">

        <div className="match_history_title" id="v"><b> {t("blitz")} </b> - timeAgo12312 <span className="viewmore" data-i18n="match-details"></span></div>

        <div className="hero_img" data-tooltip="' + matchdata.actor + '" style={{backgroundImage: "url(https://vgpro.gg/assets/images/heroes/adagio.gif)"}}></div>

        <div className="kda" >
          <span className="kills">1</span> / <span className="deaths">2</span> / <span className="assists">3</span>
          <span className="totalkda" data-i18n="[append]kda" data-tooltip="(' + matchdata.kills + ' k + ' + matchdata.assists + ' a) / ' + matchdata.deaths + ' d">
            <span>2.5</span>
          </span>
        </div>
        
        <div className="stats">
          <div className="role" data-i18n="[html]role-' + matchdata.Role + '">Carry</div>
          <div className="gold">2.3k (123 g/min)</div>
          <div className="cs" data-tooltip="' + matchdata.jungleKills + ' Jungle Kills">123 CS (125 cs/min)</div>
        </div>
        
        <div className="items">
          <div className="item_img" data-tooltip="' + items.replace(/-/g, ' ') + '" style={{backgroundImage: "url(http://vgpro.gg/assets/images/items/sorrowblade.png)"}}></div>
        </div>
        <div className="player_list">
          <div className="aside">
            <a href="' + fun.baseurlp + fun.region + '/' + valuetwo.name + '" target="_self">
              <div className="player_list_name" id="' + style + '">
                <div className="player_list_hero" style={{backgroundImage: "url(http://vgpro.gg/assets/images/heroes/adagio.gif)"}}></div>
                <span className="player_name">' + valuetwo.name + '</span>
              </div>
            </a>
          </div>
          <div className="bside">
            <a href="' + fun.baseurlp + fun.region + '/' + valuetwo.name + '" target="_self">
              <div className="player_list_name" id="' + style + '">
                <div className="player_list_hero" style={{backgroundImage: "url(http://vgpro.gg/assets/images/heroes/adagio.gif)"}}></div>
                <span className="player_name">' + valuetwo.name + '</span>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="match_history_more" id="' + matchdata.MId + '">
            {/* <MatchMore /> */}
      
      </div>
    </div>
    )
  }
}

export default Match;