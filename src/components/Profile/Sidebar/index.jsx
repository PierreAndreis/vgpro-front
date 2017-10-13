import React from "react";


class Sidebar extends React.Component {
  render() {
    return (
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
    )
  }
}

export default Sidebar;