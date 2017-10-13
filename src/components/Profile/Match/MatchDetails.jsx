import React from "react";



class MatchDetails extends React.Component {

  render() {
    return (
      <div>
        <div className="tab_header">
          <div className="tab select" id="overview" data-i18n="[html]overview">Overview</div>
          <div className="tab" id="killmap" data-i18n="[html]kill-map">Kill Map</div>
          <div className="tab" id="builds" data-i18n="[html]builds-breakdown">Player Builds</div>
          <div className="tab" id="draft">Draft</div>
          <div className="tab" id="vision">Vision Map</div>
        </div>
  
  
        <div className="more_overview">
  
          <div className="content_overview">
            <div className="sidestats">
              <div className="head_side">
                <div className="info" data-i18n="[append]' + teamid.toLowerCase() + '-side">
                  <span id="' + winner + '" data-i18n="[html]' + winner + '">win</span>
                </div>
                <div className="items" data-i18n="[html]items">Items</div>
                <div className="kda" data-i18n="[html]kda">KDA </div>
                <div className="damage" data-i18n="[html]damage">Damage</div>
                <div className="cs">CS</div>
                <div className="gold">Gold</div>
                <div className="tier" data-i18n="[html]tier">Tier</div>
              </div>
  
              <div className="each">
                <div className="info">
                  <a href="' + config.baseurlp + match.region + '/' + el.name + '" target="_self">
                    <div className="hero_img" data-tooltip="' + el.actor + '" style={{backgroundImage: "url(http://vgpro.gg/assets/images/heroes/adagio.gif)"}}></div>
                    <div className="player_name">4ever</div>
                  </a>
                </div>
  
                <div className="items">
                  <div className="item_img" data-tooltip="' + el + '" style={{backgroundImage: "url(https://vgpro.gg/assets/images/items/contraption.png)"}}></div>
                  <div className="item_img" data-tooltip="' + el + '" style={{backgroundImage: "url(https://vgpro.gg/assets/images/items/contraption.png)"}}></div>
                  <div className="item_img" data-tooltip="' + el + '" style={{backgroundImage: "url(https://vgpro.gg/assets/images/items/contraption.png)"}}></div>
                  <div className="item_img" data-tooltip="' + el + '" style={{backgroundImage: "url(https://vgpro.gg/assets/images/items/contraption.png)"}}></div>
                  <div className="item_img" data-tooltip="' + el + '" style={{backgroundImage: "url(https://vgpro.gg/assets/images/items/contraption.png)"}}></div>
                  <div className="item_img" data-tooltip="' + el + '" style={{backgroundImage: "url(https://vgpro.gg/assets/images/items/contraption.png)"}}></div>
                </div>
  
                <div className="kda">
                  <span className="kda">1.32 KDA</span>
                  <span className="numb">1 / <span className="death">2</span> / 3</span>
                </div>
  
                <div className="damage" data-dmg="' + teamid + el.actor + '">
                  <span>Loading.</span>
                  <div className="bar"><div className="fill" style={{width:"80%"}}></div></div>
                </div>
  
                <div className="cs">
                  <span className="total">15 cs</span>
                  <span className="jungle" data-i18n="[append]jungle">12 </span>
                </div>
                <div className="gold">-/-</div>
                <div className="tier" data-tooltip="' + el.skillName + ' ' + el.skillColor + '">
                  <div className="tier_img" style={{backgroundImage: "url(http://vgpro.gg/assets/images/skilltier/23.png)"}}></div>
                </div>
              </div>
              <div className="team_stats">
                <div className="stats">
                  <span className="name" id="sentrygun"></span>
                  <span className="value" id="sentrygun"> 2</span>
                </div>
  
                <div className="stats">
                  <span className="name" data-i18n="[prepend]krakens">:</span>
                  <span className="value"> 3</span>
                </div>
  
                <div className="stats">
                  <span className="name" data-i18n="[prepend]gold">:</span>
                  <span className="value"> 131k</span>
                </div>
  
                <div className="stats">
                  <span className="name" data-i18n="[prepend]aces">:</span>
                  <span className="value"> 32</span>
                </div>
  
                <div className="stats" id="not">
                  <span className="name" data-i18n="[prepend]kills">:</span>
                  <span className="value"> 14</span>
                </div>
  
                <div className="stats" id="not">
                  <span className="name" data-i18n="[prepend]deaths">:</span>
                  <span className="value"> 23</span>
                </div>
  
                <div className="stats" id="not">
                  <span className="name" data-i18n="[prepend]assists">:</span>
                  <span className="value"> 43</span>
                </div>
              </div>
            </div>
          </div>
  
          {/* */}
          <div style={{width: "100%", height: "20px", background: "black"}} />
          {/* */}
  
          <div className="content_killmap" id="' + matchdata.MatchId + '">
            <div className="more_team">
              <div className="more_wrap">
                <div className="more_nameT" data-i18n="[prepend]blue-side"></div>
  
                <div className="more_heroes killmap_heroes">
                  <div className="more_hero_img" style={{backgroundImage: "url(https://vgpro.gg/assets/images/heroes/adagio.gif)", borderLeft: "8px solid red"}}></div>
                  <div className="more_hero_name">Adagio</div>
                </div>
              </div>
            </div>
          
            <div className="map">
              <div className='point 1' data-tooltip='" + hero + " killed " + kills.Killed + "' style={{backgroundColor: "red",top: "2%",left: "30%"}} />
              <div className='point 1' data-tooltip='" + hero + " killed " + kills.Killed + "' style={{backgroundColor: "white",top: "15%",left: "30%"}} />
            </div>
          
            <div className="more_team">
              <div className="more_wrap">
                <div className="more_nameT red"></div>
                <div className="more_heroes killmap_heroes">
                  <div className="more_hero_img" style={{backgroundImage: "url(https://vgpro.gg/assets/images/heroes/adagio.gif)", borderLeft: "8px solid red"}}></div>
                  <div className="more_hero_name">Adagio</div>
                </div>
              </div>
            </div>
          </div>
  
          {/* */}
          <div style={{width: "100%", height: "20px", background: "black"}} />
          {/* */}
  
          <div className="content_builds" id="' + matchdata.MatchId + '">
  
  
            <div className="more_team">
              <div className="more_wrap">
                <div className="more_nameT" data-i18n="[prepend]blue-side"></div>
                <div className="more_heroes build_heroes" data-herodata="' + hero_data + '" data-match="' + matchdata.MatchId + '" data-side="Blue" data-name="' + hero + '">
                  <div className="more_hero_img" style={{backgroundImage: "url(http://vgpro.gg/assets/images/heroes/adagio.gif)"}}></div>
                  <div className="more_hero_name">test</div>
                </div>
                <div className="more_heroes build_heroes" data-herodata="' + hero_data + '" data-match="' + matchdata.MatchId + '" data-side="Blue" data-name="' + hero + '">
                  <div className="more_hero_img" style={{backgroundImage: "url(http://vgpro.gg/assets/images/heroes/adagio.gif)"}}></div>
                  <div className="more_hero_name">test</div>
                </div>
                <div className="more_heroes build_heroes" data-herodata="' + hero_data + '" data-match="' + matchdata.MatchId + '" data-side="Blue" data-name="' + hero + '">
                  <div className="more_hero_img" style={{backgroundImage: "url(http://vgpro.gg/assets/images/heroes/adagio.gif)"}}></div>
                  <div className="more_hero_name">test</div>
                </div>
              </div>
            </div>
            
  
            <div className="more_team">
              <div className="more_wrap">
                <div className="more_nameT red" data-i18n="[prepend]red-side"></div>
                <div className="more_heroes build_heroes" data-herodata="' + hero_data + '" data-match="' + matchdata.MatchId + '" data-side="Red" data-name="adagio">
                  <div className="more_hero_img" style={{backgroundImage: "url(http://vgpro.gg/assets/images/heroes/adagio.gif)"}}></div>
                  <div className="more_hero_name">test</div>
                </div>
                <div className="more_heroes build_heroes" data-herodata="' + hero_data + '" data-match="' + matchdata.MatchId + '" data-side="Red" data-name="adagio">
                  <div className="more_hero_img" style={{backgroundImage: "url(http://vgpro.gg/assets/images/heroes/adagio.gif)"}}></div>
                  <div className="more_hero_name">test</div>
                </div>
                <div className="more_heroes build_heroes" data-herodata="' + hero_data + '" data-match="' + matchdata.MatchId + '" data-side="Red" data-name="adagio">
                  <div className="more_hero_img" style={{backgroundImage: "url(http://vgpro.gg/assets/images/heroes/adagio.gif)"}}></div>
                  <div className="more_hero_name">test</div>
                </div>
              </div>
            </div>
  
            <div className="builds_content" id="' + matchdata.MatchId + '">
  
              <div className="heroes_build ' + hero_data + '_build">
  
                <div className="title" data-i18n="[html]skills">Skills</div>
  
                <div className="skill_wrap">
  
                  <div className="skill_overdrive">
                    <h2 data-i18n="[html]overdrive">Overdrive</h2>
                    <div className="overdrive_content" id="' + hero_data + '">
                      <div className="skill_img" style={{backgroundImage: "url(http://vgpro.gg/assets/images/abilities/kestrel_c.png)"}}></div>
                      <div className="skill_img" style={{backgroundImage: "url(http://vgpro.gg/assets/images/abilities/kestrel_c.png)"}}></div>
                    </div>
                  </div>
  
                  <div className="skill_order" id="' + hero_data + '">
                  <div className="skill a">
                    <div className="skill_img" style={{backgroundImage: "url(https://vgpro.gg/assets/images/abilities/kestrel_c.png)"}} />
                    <div className="level level_1 levelup">1</div>
                    <div className="level level_2 ">2</div>
                    <div className="level level_3">3</div>
                    <div className="level level_4">4</div>
                    <div className="level level_5">5</div>
                    <div className="level level_6">6</div>
                    <div className="level level_7">7</div>
                    <div className="level level_8">8</div>
                    <div className="level level_9">9</div>
                    <div className="level level_10">10</div>
                    <div className="level level_11">11</div>
                    <div className="level level_12">12</div>
                  </div>
                  <div className="skill b">
                    <div className="skill_img" style={{backgroundImage: "url(https://vgpro.gg/assets/images/abilities/kestrel_c.png)"}} />
                    <div className="level level_1">1</div>
                    <div className="level level_2 levelup">2</div>
                    <div className="level level_3">3</div>
                    <div className="level level_4">4</div>
                    <div className="level level_5">5</div>
                    <div className="level level_6">6</div>
                    <div className="level level_7">7</div>
                    <div className="level level_8">8</div>
                    <div className="level level_9">9</div>
                    <div className="level level_10">10</div>
                    <div className="level level_11">11</div>
                    <div className="level level_12">12</div>
                  </div>
                  <div className="skill c">
                    <div className="skill_img" style={{backgroundImage: "url(https://vgpro.gg/assets/images/abilities/kestrel_c.png)"}} />
                    <div className="level level_1">1</div>
                    <div className="level level_2">2</div>
                    <div className="level level_3 levelup">3</div>
                    <div className="level level_4 levelup">4</div>
                    <div className="level level_5 levelup">5</div>
                    <div className="level level_6 levelup">6</div>
                    <div className="level level_7 levelup">7</div>
                    <div className="level level_8 levelup">8</div>
                    <div className="level level_9 levelup">9</div>
                    <div className="level level_10 levelup">10</div>
                    <div className="level level_11 levelup">11</div>
                    <div className="level level_12 levelup">12</div>
                  </div>
                </div>
  
              </div>
  
              <div className="title" data-i18n="[html]builds-breakdown">Build</div>
                <div className="build_wrap" id="' + hero_data + '">
                  <div className="item">
                    <div className="item_img" style={{backgroundImage: "url(http://vgpro.gg/assets/images/items/flare-gun.png)"}}></div>
                    <div className="item_time">13:32</div>
                  </div>
                  <div className="item">
                    <div className="item_img" style={{backgroundImage: "url(http://vgpro.gg/assets/images/items/flare-gun.png)"}}></div>
                    <div className="item_time">13:32</div>
                  </div>
                  <div className="item">
                    <div className="item_img" style={{backgroundImage: "url(http://vgpro.gg/assets/images/items/flare-gun.png)"}}></div>
                    <div className="item_time">13:32</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          {/*  */}
          <div style={{width: "100%", height: "20px", background: "black"}} />
          {/* */}
  
          <div className="content_draft" id="' + matchdata.MatchId + '">
  
            <div className="draft_content" id="' + matchdata.MatchId + '">
              <div className="team-a-c">
                <div className="team-a draft-ban">
                  <div className="hero_img" style={{backgroundImage: "url(http://vgpro.gg/assets/images/heroes/adagio.gif)"}} />
                </div>
                <div className="team-a draft-pick">
                  <div className="hero_img" style={{backgroundImage: "url(http://vgpro.gg/assets/images/heroes/adagio.gif)"}} />
                </div>
                <div className="team-a draft-pick">
                  <div className="hero_img" style={{backgroundImage: "url(http://vgpro.gg/assets/images/heroes/adagio.gif)"}} />
                </div>
                <div className="team-a draft-pick">
                  <div className="hero_img" style={{backgroundImage: "url(http://vgpro.gg/assets/images/heroes/adagio.gif)"}} />
                </div>
              
              </div>
              <div className="team-b-c">
                <div className="team-b draft-ban">
                  <div className="hero_img" style={{backgroundImage: "url(http://vgpro.gg/assets/images/heroes/adagio.gif)"}} />
                </div>
                <div className="team-b draft-pick">
                  <div className="hero_img" style={{backgroundImage: "url(http://vgpro.gg/assets/images/heroes/adagio.gif)"}} />
                </div>
                <div className="team-b draft-pick">
                  <div className="hero_img" style={{backgroundImage: "url(http://vgpro.gg/assets/images/heroes/adagio.gif)"}} />
                </div>
                <div className="team-b draft-pick">
                  <div className="hero_img" style={{backgroundImage: "url(http://vgpro.gg/assets/images/heroes/adagio.gif)"}} />
                </div>
              </div>
            </div>
  
           </div>
  
          {/* */}
          <div style={{width: "100%", height: "20px", background: "black"}} />
          {/* */}
  
          <div className="content_vision" id="' + matchdata.MatchId + '">
            <div className="more_team">
              <div className="more_wrap">
                <div className="more_heroes vision_team" data-match="' + matchdata.MatchId + '" data-side="Blue" data-name="Blue">
                  <div className="more_hero_img" style={{backgroundColor:"#5285C9"}}></div>
                  <div className="more_hero_name" data-i18n="[prepend]blue-side"></div>
                </div>
                <div className="more_heroes vision_team"  data-match="' + matchdata.MatchId + '" data-side="Red" data-name="Red">
                  <div className="more_hero_img" style={{backgroundColor:"#FF5944"}}></div>
                  <div className="more_hero_name" data-i18n="[prepend]red-side"></div>
                </div>
              </div>
            </div>
            <div className="map">
              <div className="heatmap heat_map_Blue' + matchdata.MatchId + '" id="' + matchdata.MatchId.substring(25, 30) + '" style={{display:"none"}}></div>
              <div className="heatmap heat_map_Red' + matchdata.MatchId + '" id="' + matchdata.MatchId.substring(25, 30) + '" style={{display:"none"}}></div>
            </div>
          </div>
  
        </div>
      </div>
    )
  }
}

export default MatchDetails;