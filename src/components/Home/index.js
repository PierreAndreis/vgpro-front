import React from "react";

import "./home.base.css";
import "./home.resp.css";

class HomePage extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <div className="content">
        <div className="wrap">
          <div className="content-out">
            <div
              className="news"
              style={{
                display: "none"
              }}
            >
              <div>
                <svg className="circular">
                  <circle
                    className="path"
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                </svg>
              </div>
            </div>

            <div
              className="pro-feed"
              style={{
                marginTop: "10px"
              }}
            >
              <div className="box_title">
                {t("pro-history")}
                <span>{t("pro-history-desc")}</span>
              </div>
              <div className="header">
                <div className="time" />
                <div className="reg" />
                <div className="photo" />
                <div className="player_name">{t("player_name")}</div>
                <div className="victory" />
                <div className="kda">{t("kda")}</div>
                <div className="role">{t("role")}</div>
                <div className="item">{t("item")}</div>
              </div>
              <div className="pro-feed_history">
                <a
                  href="' + config.baseurlp + pro.region + '/' + pro.ign + '"
                  target="_self"
                  className="match"
                >
                  <div className="time">12 minutes ago</div>
                  <div className="reg">
                    <span>SA</span>
                  </div>
                  <div className="photo">
                    <div
                      className="pro_img"
                      style={{
                        backgroundImage: "url(assets/' + pro.ProfilePic + ')"
                      }}
                    />
                    <div
                      className="hero_img"
                      style={{
                        backgroundImage:
                          "url(assets/images/heroes/' + pro.actor + '.gif)"
                      }}
                    />
                  </div>
                  <div className="player_name">4ever</div>
                  <div
                    className="victory"
                    id="win"
                    data-i18n="[html]' + win + '"
                  />
                  <div className="kda">1/23/32</div>
                  <div className="role" data-i18n="[html]role-' + pro.role + '">
                    Carry
                  </div>'
                  <div className="item">
                    <div
                      className="item_img"
                      data-tooltip="' + items.replace(/-/g, ' ') + '"
                      style={{
                        backgroundImage:
                          "url(assets/images/items/' + items + '.png)"
                      }}
                    />
                  </div>
                </a>
                <a
                  href="' + config.baseurlp + pro.region + '/' + pro.ign + '"
                  target="_self"
                  className="match"
                >
                  <div className="time">12 minutes ago</div>
                  <div className="reg">
                    <span>SA</span>
                  </div>
                  <div className="photo">
                    <div
                      className="pro_img"
                      style={{
                        backgroundImage: "url(assets/' + pro.ProfilePic + ')"
                      }}
                    />
                    <div
                      className="hero_img"
                      style={{
                        backgroundImage:
                          "url(assets/images/heroes/' + pro.actor + '.gif)"
                      }}
                    />
                  </div>
                  <div className="player_name">4ever</div>
                  <div
                    className="victory"
                    id="win"
                    data-i18n="[html]' + win + '"
                  />
                  <div className="kda">1/23/32</div>
                  <div className="role" data-i18n="[html]role-' + pro.role + '">
                    Carry
                  </div>'
                  <div className="item">
                    <div
                      className="item_img"
                      data-tooltip="' + items.replace(/-/g, ' ') + '"
                      style={{
                        backgroundImage:
                          "url(assets/images/items/' + items + '.png)"
                      }}
                    />
                  </div>
                </a>
              </div>

              <div>
                <div className="view_more">{t("view-more")}</div>
                <div
                  className="view_more"
                  id="reset"
                  style={{
                    display: "none"
                  }}
                >
                  {t("view-less")}
                </div>
              </div>
            </div>
          </div>

          <div className="leaderbox">
            <div className="box_title" data-i18n="[prepend]global-stats">
            {t('global-stats')}
              <span> {t('global-stats-desc')} </span>
            </div>

            <div className="lead_content">
              <div className="eachbox" id="leadboard">
                <div className="title">
                  {t("leadboard")}{" "}
                  <select className="region_leadboard">
                    <option value="all">ALL</option>
                    <option value="na">NA</option>
                    <option value="eu">EU</option>
                    <option value="sa">SA</option>
                    <option value="ea">EA</option>
                    <option value="sg">SEA</option>
                    <option value="cn">CN</option>
                  </select>
                </div>
                <div className="subtitle">
                  <div className="number">#</div>
                  <div className="skilltier" />
                  <div className="player_name" />
                  <div className="KDA">KDA</div>
                  <div className="rating">VPR</div>
                </div>
                <div className="box_content_leadboard">
                  <div
                    className="eachregion"
                    id="' + region + '"
                  >
                    <a
                      href="' + config.baseurlp + player.region + '/' + player.name + '"
                      target="_self"
                    >
                      <div className="eachdata">
                        <div className="number">
                          <span>1</span>
                        </div>
                        <div className="skilltier">
                          <div className="skilltier_img" style={{backgroundImage: "url(/assets/images/skilltier/1.png)"}} />
                        </div>
                        <div className="player_name">
                          <span>SA</span> 4ever
                        </div>

                        <div className="kda">5.31</div>
                        <div className="rating">1200</div>
                      </div>
                    </a>
                  </div>
                </div>
                <a href="/leaderboard" target="_self">
                  <div>
                    <div className="view_more" id="more">
                      {t("view-more")}
                    </div>
                  </div>
                </a>
              </div>
              <div className="eachbox" id="winrate">
                <div className="title">
                  {t("win-rate")} <span>{t("by-region")}</span>
                </div>
                <div className="subtitle">
                  <div className="reg">{t("region")}</div>
                  <div className="hero_w">{t("highest")}</div>
                  <div className="hero_l">{t("lowest")}</div>
                </div>
                <div className="box_content_winrate">
                  <div className="eachdata">
                    <div className="reg">
                      <span>1</span>
                    </div>
                    <div className="hero_w">
                      <div
                        className="hero_img"
                        style={{
                          backgroundImage:
                            "url(assets/images/heroes/' + Object.keys(re.WinRate)[0].toLowerCase() + '.gif)"
                        }}
                      />
                      <div className="hero_name">2</div>
                      <div className="hero_value">3</div>
                    </div>
                    <div className="hero_l">
                      <div
                        className="hero_img"
                        style={{
                          backgroundImage:
                            "url(assets/images/heroes/' + Object.keys(re.WinRate)[length].toLowerCase() + '.gif)"
                        }}
                      />
                      <div className="hero_name">4</div>
                      <div className="hero_value">5</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="eachbox" id="pickrate">
                <div className="title">
                  {t("pick-rate")}{" "}
                  <span data-i18n="[html]by-region">{t("by-region")}</span>
                </div>
                <div className="subtitle">
                  <div className="reg">{t("region")}</div>
                  <div className="hero_w">{t("highest")}</div>
                  <div className="hero_l">{t("lowest")}</div>
                </div>
                <div className="box_content_pickrate">
                  <div className="eachdata">
                    <div className="reg">
                      <span>1</span>
                    </div>
                    <div className="hero_w">
                      <div
                        className="hero_img"
                        style={{
                          backgroundImage:
                            "url(assets/images/heroes/' + Object.keys(re.WinRate)[0].toLowerCase() + '.gif)"
                        }}
                      />
                      <div className="hero_name">2</div>
                      <div className="hero_value">3</div>
                    </div>
                    <div className="hero_l">
                      <div
                        className="hero_img"
                        style={{
                          backgroundImage:
                            "url(assets/images/heroes/' + Object.keys(re.WinRate)[length].toLowerCase() + '.gif)"
                        }}
                      />
                      <div className="hero_name">4</div>
                      <div className="hero_value">5</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
