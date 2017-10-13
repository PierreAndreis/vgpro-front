import React from "react";

import "./MatchFilter.css";

class MatchFilter extends React.Component {

  render() {

    const {t} = this.props;

    return (
      <div className="Profile__MatchFilter">
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
    )
  }
}

export default MatchFilter;