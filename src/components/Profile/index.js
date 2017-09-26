import React from "react";

import "./profile.base.css";
import "./profile.resp.css";

const MatchMore = () => {
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

class Profile extends React.Component {
  render() {

    const {t} = this.props;
    return (
      <div>
        <div className="profile">
          <div className="wrap">
            <div className="profile_stats_wrap">
              <div className="profile_img_wrap">
                {/* <div className="profile_hero">
                  <div className='hero_img' style={{backgroundImage: "url(http://vgpro.gg/assets/images/skilltier/23.png)"}}></div>
                </div> */}

                <div className="profile_img">
                  <div className='player_img' style={{backgroundImage: "url(http://vgpro.gg/assets/players_pics/DNZio.png)"}}></div>
                </div> 

              </div>

              <div className="profile_stuff">
                <div className="profile_title"> <span>' + val.title + ' ' + val.extra + '</span> </div>
                <div className="profile_name">Loading</div>
                <div className="profile_team">
                  <span className="team_name">%teamname%</span> |{" "}
                  <span className="team_role"><span>{t('carry')}</span></span>
                  <br />
                  <span className="from">%from% <span className='flag-icon flag-icon-us'></span></span>
                </div>
                <div
                  className="update"
                  data-tooltip="Every 10-20 minutes"
                >
                {t("last-update")}
                  {" "}
                  Loading
                </div>
                <div className="profile_desc">
                  <h3> {t("most-played-heroes")} </h3>
                  <span className="heroes_img_space"><div className="heroes_img" style={{backgroundImage: "url(http://vgpro.gg/assets/images/heroes/adagio.gif)"}} /></span>

                  <h3> {t("recent-results")} </h3>
                  <div className="recent_results"><div className="match_result" id="d"></div> <div className="match_result" id="v"></div></div>
                </div>
              </div>
              <div className="profile_stats">
                <div className="winrate_ranked">
                  <h2 data-tooltip="Wins / Games">
                    {t("win-rate")}
                    {" "}
                    (<span className="total_matches">0</span>)
                  </h2>
                  <canvas className="chart" width="80%" height="80%" />
                  <h3>0%</h3>
                </div>
                <div className="kp">
                  <h2 data-tooltip="Kill Participation (Kills + Assists) / Total Kills">
                    K/P
                  </h2>
                  <canvas id="chart" width="80%" height="80%" />
                  <h3>0%</h3>
                </div>
                <div className="kda">
                  <h1>
                    <span id="good">0</span>
                  </h1>
                  <h4>
                    <span id="kills">0</span> / <span id="mortes">0</span> /{" "}
                    <span id="assist">0</span>
                  </h4>
                  <h2 data-tooltip="(Kills + Assists) / Deaths">KDA</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="profile_second">
          <div className="wrap">
            <div className="box">
              <div className="aka">
                <h2>Also Known As:</h2>
                <div className="aka_names" >
                <a href='" + fun.baseurlp + fun.region +  + value + "' target='_self'>
                  <span>" + value + "</span>
                </a>
                </div>
              </div>
              <div className="gamemodes">
                  <div className="gamemode select" id="all" data-i18n="[prepend]all"> (' + total + ')</div>
                  <div className="gamemode" id="' + index + '" data-i18n="[prepend]' + index.replace('x', ' ') + '"> <span>(' + qnty + ')</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="wrap">
            <div className="sidebar">
              <div className="box" id="rating_div">
                <div className="box_title">
                  <span>{t("ratings")}</span>{" "}
                  <span
                    className="profile_name"
                    style={{ textTransform: "none" }}
                  >
                    --
                  </span>
                </div>
                <div className="body_box">
                  <div className="rating">
                    <div
                      className="rating_number"
                      data-tooltip="You need to play more ranked!"
                    >
                      ?
                    </div>
                    <div
                      className="rating_caption"
                      data-tooltip="VGPRO RATING"
                    >
                      VPR
                    </div>
                    <div className="position">
                      <span>#?</span> GLOBAL
                    </div>
                    <div className="position">
                      <span>#?</span> REGION ?
                    </div>
                  </div>
                  <div className="rating">
                                      {/* if (rating >= 2000) {
                          style = "avg"
                      };
                      if (rating >= 2600) {
                          style = "high";
                      }
                      if (rating >= 2950) {
                          style = "superhigh";
                      }
                      if (rating <= 1900) {
                          style = "low";
                      }
                      if (rating <= 1000) {
                          style = "suplow";
                      } */}
                      <div className="rating_number" id=' + style + '>123</div>
                    <div className="rating_caption" data-tooltip="VGPRO RATING">VPR</div>
                    <div className="position"><span>#1</span> GLOBAL</div>
                    <div className="position"><span>#2</span> REGION SA</div>
                  </div>
                  <div className="info">
                    <p
                      style={{color:"rgb(242, 191, 0)"}}
                      id="alert_ranked"
                    >
                      {t('rating-alert')}
                      {/* You need a minimium of 10 ranked games wins. */}
                    </p>
                    <p>
                      {t("rating-info-one")}
                      {/* VGPRO RATING is a rating calculated by VGPRO.gg based on
                      your skill tier, perfomance, and kda in Ranked Matches. */}
                    </p>
                    <p>
                      {t("rating-info-two")}
                      {/* Rank is a representative of your position against others
                      players using VGPRO.gg services. */}
                    </p>
                    <p>
                      {t("rating-info-three")}
                      {/* This data does not represent the entire Vainglory Game. */}
                    </p>
                  </div>
                </div>
              </div>
              <div className="box">
                <div className="box_title">
                  {t("most-played-heroes")}
                </div>
                <div className="body_box">
                  <div className="champions">
                    <div className="hero_each" data-hero="' + key.toLowerCase() + '">
                    <div className="hero_img" style={{backgroundImage: "url(http://vgpro.gg/assets/images/heroes/adagio.gif)"}}></div>
                    <div className="hero_name">Adagio</div>
                    <div className="hero_kda">
                      <span data-tooltip="Avg. CS per game">14 CS</span>
                      <span className="kda" data-tooltip="(1 K + 3 A) / 2 D"> 2.5 {t("kda")}</span></div>
                      <div className="hero_winrate" id="d" data-tooltip="' + hero.totalVictory + 'W ' + hero.totalLoss + ' L" >15%</div>
                      <div className="hero_games">124 {t("sidebar-played")}</div></div>
                  </div>
                  <br />
                  <div className="view_morediv">
                    <div
                      className="view_more"
                      id="hero"
                    >
                      {t("view-more")}
                    </div>
                    <div
                      className="view_more"
                      id="resethero"
                      style={{ display: "none" }}
                    >
                      {t("view-less")}
                    </div>
                  </div>
                  <br />
                </div>
              </div>
              <div className="box">
                <div className="box_title">
                {t("recent-roles")}
                </div>
                <div className="body_box">
                  <div className="allroles">
                    <div className="eachrole">
                      <div
                        className="role_img"
                        id="carry"
                        data-tooltip={t("role-Carry")}
                      />
                      <div className="role_desc" id="carry"><span>1</span> /<span className='d'> 2 </span>/ <span>3</span></div>
                      <div
                        className="role_kda"
                        id="carry"
                      >
                        2.6 {t("kda")}
                      </div>
                      <div className="role_winrate" id="carry">
                        0%
                      </div>
                      <div
                        className="role_games"
                        id="carry"
                      >
                        15% {t("sidebar-played")}
                      </div>
                    </div>
                    <div className="eachrole">
                      <div
                        className="role_img"
                        id="jungler"
                        data-tooltip={t("role-Jungler")}
                      />
                      <div className="role_desc" id="jungler"> 1/2/3</div>
                      <div
                        className="role_kda"
                        id="jungler"
                      >
                        2.6 {t("kda")}
                      </div>
                      <div className="role_winrate" id="jungler">
                        0%
                      </div>
                      <div
                        className="role_games"
                        id="jungler"
                      >
                        15% {t("sidebar-played")}
                      </div>
                    </div>
                    <div className="eachrole">
                      <div
                        className="role_img"
                        id="captain"
                        data-tooltip={t("role-Captain")}
                      />
                      <div className="role_desc" id="captain"> 1/2/3</div>
                      <div
                        className="role_kda"
                        id="captain"
                      >
                        2.6 {t("kda")}
                      </div>
                      <div className="role_winrate" id="captain">
                        0%
                      </div>
                      <div
                        className="role_games"
                        id="captain"
                      >
                        15% {t("sidebar-played")}
                      </div>
                    </div>
                  </div>
                  <div className="role" id="charts" style={{ width: "200px" }}>
                    <canvas className="chart" width="100%" height="100%" />
                  </div>
                </div>
              </div>
              <div className="box">
                <div className="box_title">
                  {t("recent-played-with")}
                </div>
                <div className="body_box">
                  <div className="recent_played">
                    <a href="' + fun.baseurlp + fun.region + '/' + key + '" target="_self">
                    <div className="recent_played_each">
                      <div className="recent_played_name">4ever</div>
                      <div className="recent_played_win">2W</div>
                      <div className="recent_played_loss">1L</div>
                      <div className="recent_played_winrate" id="' + style + '">15%</div>
                      <div className="recent_played_games">144 {t(`sidebar-played`)}</div></div>
                    </a>
                  </div>
                  <br />
                  <div className="view_morediv">
                    <div
                      className="view_more"
                      id="recent"
                    >{t("view-more")}</div>
                    <div
                      className="view_more"
                      id="recentreset"
                      style={{ display: "none" }}
                    >
                      {t("view-less")}
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            </div>
            <div className="match_history_content">
              <div className="match_filter">
                <div className="not-filter">
                  <div className="blueside">
                    <h2>0%</h2>
                    <canvas className="chart" width="100%" height="100%" />
                    <h3>
                      {t("blue-side")}
                      (<span>0</span>)
                    </h3>
                  </div>
                  <div className="redside">
                    <h2>0%</h2>
                    <canvas className="chart" width="100%" height="100%" />
                    <h3>
                      {t("red-side")}
                      (<span>0</span>)
                    </h3>
                  </div>
                </div>
                <div className="stats_filter">
                  <h4>{t("avg-played")}</h4>
                  <div className="stats_each">
                    <div className="stats_qty">...</div>
                    <div className="stats_name">
                      {t("cs")}
                    </div>
                  </div>
                  <div className="stats_each" id="aces">
                    <div className="stats_qty">...</div>
                    <div className="stats_name">
                      {t("aces")}
                    </div>
                  </div>
                  <div className="stats_each" id="krakens">
                    <div className="stats_qty">...</div>
                    <div className="stats_name">
                      {t("krakens")}
                    </div>
                  </div>
                </div>
                <div className="filter">
                  <div className="box_filter">
                    <div className="head">
                      {t("filter-by")}
                    </div>
                    <div className="boxcontent">
                      <div className="teammate">
                        <div className="label">
                          {t("filter-players")}
                        </div>
                        <i className="fa fa-search" />
                        <input type="text" className="search_team" />
                      </div>
                      <div className="hero">
                        <div className="label">
                          {t("filter-hero")}
                        </div>
                        <select className="heroes_x" id="heroes_x">
                          <option value="all" defaultValue>
                            {t("all")}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="match_history">
              
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
                      <MatchMore />
                
                </div>
              </div>
              </div>

              <div
                className="view_more"
                id="match_history"
              >
                {t("view-more")}
              </div>
              <div
                className="view_more"
                id="hero_history"
                style={{ display: "none" }}
              >
                {t("view-more")}
              </div>
              <div
                className="view_more"
                id="view_all"
                style={{ display: "none" }}
              >
                {t("reset")}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
