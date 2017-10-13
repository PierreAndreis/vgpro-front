import React from "react";

import "./PlayerStats.css";

class PlayerStats extends React.Component{

  render() {

    const {t} = this.props;

    return (
      <div className="Profile__Header-Stats">
      <div className="winrate_ranked">
        <h2 data-tooltip="Wins / Games">
          {t("win-rate")}
          {" "}
          (<span className="total_matches">0</span>)
        </h2>
        <canvas className="chart" width="80%" height="80%"/>
        <h3>0%</h3>
      </div>
      <div className="kp">
        <h2 data-tooltip="Kill Participation (Kills + Assists) / Total Kills">
          K/P
        </h2>
        <canvas id="chart" width="80%" height="80%"/>
        <h3>0%</h3>
      </div>
      <div className="kda">
        <h1>
          <span id="good">0</span>
        </h1>
        <h4>
          <span id="kills">0</span>
          /
          <span id="mortes">0</span>
          /{" "}
          <span id="assist">0</span>
        </h4>
        <h2 data-tooltip="(Kills + Assists) / Deaths">KDA</h2>
      </div>
    </div>
    )
  }
}

export default PlayerStats;